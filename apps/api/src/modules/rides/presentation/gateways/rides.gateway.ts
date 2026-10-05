import { PublishDriverLocationUseCase } from '../../application/use-cases/publish-driver-location.use-case';
import { DriverLocationDto } from '../dto/driver-location.dto';
import {
  RideStatusChanged,
  RideLocationUpdated,
} from '../../application/contracts/ride-realtime-publisher';
import { Logger, OnModuleDestroy } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AuthenticateUserUseCase } from '../../../identity/application/use-cases/authenticate-user.use-case';
import { AuthenticatedUser } from '../../../identity/application/types/authenticated-user';
import { ListAvailableRidesUseCase } from '../../application/use-cases/list-available-rides.use-case';
import { AuthorizeRideRoomUseCase } from '../../application/use-cases/authorize-ride-room.use-case';
import { SocketIoRidePublisher } from '../../infrastructure/realtime/socket-io-ride-publisher';
import { ApplicationError } from '@/shared/errors/application-error';
import { ERROR_KINDS } from '@/shared/errors/error-kinds';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import {
  AvailableRidesDto,
  JoinRideDto,
  RideJoinedDto,
  RideSocketErrorDto,
} from '../dto/ride-socket.dto';
import { toRideResponse } from '../mappers/ride-response.mapper';
import { RIDE_SOCKET_EVENTS, rideRoom } from './ride-socket.events';

interface ClientEvents {
  'driver:location': (payload: DriverLocationDto) => void;
  'get-rides': () => void;
  'ride:join': (payload: JoinRideDto) => void;
}

interface ServerEvents {
  'ride:location_updated': (payload: RideLocationUpdated) => void;
  'ride:status_changed': (payload: RideStatusChanged) => void;
  'rides:list': (payload: AvailableRidesDto) => void;
  'ride:joined': (payload: RideJoinedDto) => void;
  'ride:error': (payload: RideSocketErrorDto) => void;
}

type RideSocket = Socket<
  ClientEvents,
  ServerEvents,
  Record<string, never>,
  { actor: AuthenticatedUser }
>;

@WebSocketGateway({ namespace: '/rides' })
export class RidesGateway
  implements
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnModuleDestroy
{
  private readonly logger = new Logger(RidesGateway.name);
  private readonly revalidation = new Map<string, NodeJS.Timeout>();

  constructor(
    private readonly authenticate: AuthenticateUserUseCase,
    private readonly listRides: ListAvailableRidesUseCase,
    private readonly authorizeRoom: AuthorizeRideRoomUseCase,
    private readonly publisher: SocketIoRidePublisher,
    private readonly publishLocation: PublishDriverLocationUseCase,
  ) {}

  afterInit(namespace: Namespace): void {
    this.publisher.attach(namespace);
    namespace.use((socket, next) => {
      void this.authenticateSocket(socket as RideSocket).then(
        () => next(),
        () => next(new Error(ERROR_MESSAGES.INVALID_AUTHENTICATION)),
      );
    });
  }

  handleConnection(socket: RideSocket): void {
    // Recheck idle connections too, so expired/inactive users do not stay in rooms.
    const timer = setInterval(() => {
      void this.authenticateSocket(socket).catch(() => socket.disconnect(true));
    }, 30_000);
    timer.unref();
    this.revalidation.set(socket.id, timer);
  }

  handleDisconnect(socket: RideSocket): void {
    clearInterval(this.revalidation.get(socket.id));
    this.revalidation.delete(socket.id);
  }

  onModuleDestroy(): void {
    for (const timer of this.revalidation.values()) clearInterval(timer);
    this.revalidation.clear();
  }

  @SubscribeMessage(RIDE_SOCKET_EVENTS.GET_RIDES)
  async getRides(@ConnectedSocket() socket: RideSocket): Promise<void> {
    try {
      const actor = await this.authenticateSocket(socket);
      const rides = await this.listRides.execute(actor.id);
      socket.emit(RIDE_SOCKET_EVENTS.RIDES_LIST, {
        items: rides.map(toRideResponse),
      } satisfies AvailableRidesDto);
    } catch (error) {
      this.sendError(socket, RIDE_SOCKET_EVENTS.GET_RIDES, error);
    }
  }

  @SubscribeMessage(RIDE_SOCKET_EVENTS.JOIN)
  async joinRide(
    @ConnectedSocket() socket: RideSocket,
    @MessageBody() payload: unknown,
  ): Promise<void> {
    try {
      const actor = await this.authenticateSocket(socket);
      const input = plainToInstance(
        JoinRideDto,
        payload && typeof payload === 'object' && !Array.isArray(payload)
          ? payload
          : {},
      );
      const errors = await validate(input, {
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
      });
      if (errors.length) {
        socket.emit(RIDE_SOCKET_EVENTS.ERROR, {
          event: RIDE_SOCKET_EVENTS.JOIN,
          code: 'validation',
          message: 'Provide a valid rideId UUID with no extra fields',
        } satisfies RideSocketErrorDto);
        return;
      }
      const rideId = await this.authorizeRoom.execute({
        rideId: input.rideId,
        actorId: actor.id,
      });
      if (!socket.connected) return;
      await socket.join(rideRoom(rideId));
      socket.emit(RIDE_SOCKET_EVENTS.JOINED, {
        rideId,
      } satisfies RideJoinedDto);
    } catch (error) {
      this.sendError(socket, RIDE_SOCKET_EVENTS.JOIN, error);
    }
  }

  @SubscribeMessage(RIDE_SOCKET_EVENTS.LOCATION)
  async receiveLocation(
    @ConnectedSocket() socket: RideSocket,
    @MessageBody() payload: unknown,
  ): Promise<void> {
    try {
      const actor = await this.authenticateSocket(socket);
      const input = plainToInstance(
        DriverLocationDto,
        payload && typeof payload === 'object' && !Array.isArray(payload)
          ? payload
          : {},
      );
      const errors = await validate(input, {
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
      });
      if (errors.length) {
        socket.emit(RIDE_SOCKET_EVENTS.ERROR, {
          event: RIDE_SOCKET_EVENTS.LOCATION,
          code: 'validation',
          message: ERROR_MESSAGES.INVALID_DRIVER_LOCATION,
        } satisfies RideSocketErrorDto);
        return;
      }
      if (!socket.connected) return;
      await this.publishLocation.execute(actor, input);
    } catch (error) {
      this.sendError(socket, RIDE_SOCKET_EVENTS.LOCATION, error);
    }
  }

  private async authenticateSocket(
    socket: RideSocket,
  ): Promise<AuthenticatedUser> {
    const token: unknown = socket.handshake.auth.token;
    if (typeof token !== 'string' || !token) {
      throw new ApplicationError(
        ERROR_KINDS.AUTHENTICATION,
        ERROR_MESSAGES.INVALID_AUTHENTICATION,
      );
    }
    const actor = await this.authenticate.execute(token);
    socket.data.actor = actor;
    return actor;
  }

  private sendError(socket: RideSocket, event: string, error: unknown): void {
    if (!(error instanceof ApplicationError))
      this.logger.error('Ride socket request failed');
    socket.emit(RIDE_SOCKET_EVENTS.ERROR, {
      event,
      code: error instanceof ApplicationError ? error.kind : 'internal',
      message:
        error instanceof ApplicationError
          ? error.message
          : ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    } satisfies RideSocketErrorDto);
    if (
      error instanceof ApplicationError &&
      error.kind === ERROR_KINDS.AUTHENTICATION
    )
      socket.disconnect(true);
  }
}
