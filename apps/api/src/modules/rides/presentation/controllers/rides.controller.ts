import { ListRideHistoryUseCase } from '../../application/use-cases/list-ride-history.use-case';
import { RideHistoryQueryDto } from '../dto/ride-history-query.dto';
import { RideHistoryResponseDto } from '../dto/ride-history-response.dto';
import { ChangeRideStatusUseCase } from '../../application/use-cases/change-ride-status.use-case';
import { UpdateRideStatusDto } from '../dto/update-ride-status.dto';
import { AcceptRideUseCase } from '../../application/use-cases/accept-ride.use-case';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiErrorResponseDto } from '@/common/filters/api-error-response.dto';
import { AuthenticatedUser } from '../../../identity/application/types/authenticated-user';
import { UserRole } from '../../../identity/domain/enums/user-role.enum';
import { CurrentUser } from '../../../identity/presentation/decorators/current-user.decorator';
import { Roles } from '../../../identity/presentation/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../identity/presentation/guards/jwt-auth.guard';
import { RolesGuard } from '../../../identity/presentation/guards/roles.guard';
import { CreateRideUseCase } from '../../application/use-cases/create-ride.use-case';
import { GetRideDetailsUseCase } from '../../application/use-cases/get-ride-details.use-case';
import { RideDetailsResponseDto } from '../dto/ride-details-response.dto';
import { CreateRideDto } from '../dto/create-ride.dto';
import { RideIdParamDto } from '../dto/ride-id-param.dto';
import { RideResponseDto } from '../dto/ride-response.dto';
import { toRideResponse } from '../mappers/ride-response.mapper';

@Controller('rides')
@ApiTags('rides')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
export class RidesController {
  constructor(
    private readonly createRide: CreateRideUseCase,
    private readonly getRide: GetRideDetailsUseCase,
    private readonly acceptRide: AcceptRideUseCase,
    private readonly changeRideStatus: ChangeRideStatusUseCase,
    private readonly listRideHistory: ListRideHistoryUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.RIDER)
  @ApiCreatedResponse({ type: RideResponseDto })
  @ApiBadRequestResponse({ type: ApiErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ApiErrorResponseDto })
  @ApiForbiddenResponse({ type: ApiErrorResponseDto })
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateRideDto,
  ): Promise<RideResponseDto> {
    return toRideResponse(
      await this.createRide.execute({ riderId: user.id, ...dto }),
    );
  }

  @Patch(':id/accept')
  @Roles(UserRole.DRIVER)
  @ApiOkResponse({ type: RideResponseDto })
  @ApiBadRequestResponse({ type: ApiErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ApiErrorResponseDto })
  @ApiForbiddenResponse({ type: ApiErrorResponseDto })
  @ApiNotFoundResponse({ type: ApiErrorResponseDto })
  @ApiConflictResponse({ type: ApiErrorResponseDto })
  async accept(
    @CurrentUser() user: AuthenticatedUser,
    @Param() params: RideIdParamDto,
  ): Promise<RideResponseDto> {
    return toRideResponse(
      await this.acceptRide.execute({ rideId: params.id, driverId: user.id }),
    );
  }

  @Patch(':id/status')
  @Roles(UserRole.RIDER, UserRole.DRIVER)
  @ApiOkResponse({ type: RideResponseDto })
  @ApiBadRequestResponse({ type: ApiErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ApiErrorResponseDto })
  @ApiForbiddenResponse({ type: ApiErrorResponseDto })
  @ApiNotFoundResponse({ type: ApiErrorResponseDto })
  @ApiConflictResponse({ type: ApiErrorResponseDto })
  async changeStatus(
    @CurrentUser() user: AuthenticatedUser,
    @Param() params: RideIdParamDto,
    @Body() dto: UpdateRideStatusDto,
  ): Promise<RideResponseDto> {
    return toRideResponse(
      await this.changeRideStatus.execute({
        rideId: params.id,
        actor: user,
        status: dto.status,
      }),
    );
  }

  @Get('history')
  @Roles(UserRole.RIDER, UserRole.DRIVER)
  @ApiOkResponse({ type: RideHistoryResponseDto })
  @ApiBadRequestResponse({ type: ApiErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ApiErrorResponseDto })
  @ApiForbiddenResponse({ type: ApiErrorResponseDto })
  async history(
    @CurrentUser() user: AuthenticatedUser,
    @Query() query: RideHistoryQueryDto,
  ): Promise<RideHistoryResponseDto> {
    const result = await this.listRideHistory.execute({
      actor: user,
      page: query.page,
      limit: query.limit,
    });
    return {
      items: result.items.map(toRideResponse),
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }

  @Get(':id')
  @Roles(UserRole.RIDER, UserRole.DRIVER)
  @ApiOkResponse({ type: RideDetailsResponseDto })
  @ApiNotFoundResponse({ type: ApiErrorResponseDto })
  @ApiBadRequestResponse({ type: ApiErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ApiErrorResponseDto })
  @ApiForbiddenResponse({ type: ApiErrorResponseDto })
  async getById(
    @CurrentUser() user: AuthenticatedUser,
    @Param() params: RideIdParamDto,
  ): Promise<RideDetailsResponseDto> {
    const result = await this.getRide.execute({
      rideId: params.id,
      actorId: user.id,
    });
    return { ...toRideResponse(result.ride), driver: result.driver };
  }
}
