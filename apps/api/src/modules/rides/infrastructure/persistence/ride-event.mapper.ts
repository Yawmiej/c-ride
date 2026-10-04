import { Prisma } from '@/generated/prisma';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import {
  RideEvent,
  RideEventPayload,
} from '../../domain/entities/ride-event.entity';
import { RideEventType } from '../../domain/enums/ride-event-type.enum';
import { RideStatus } from '../../domain/enums/ride-status.enum';

function isRideStatus(value: unknown): value is RideStatus {
  return Object.values(RideStatus).includes(value as RideStatus);
}

export class RideEventMapper {
  static toPersistence(event: RideEvent): Prisma.RideEventUncheckedCreateInput {
    const data = event.toSafeObject();
    return {
      id: data.id,
      rideId: data.rideId,
      type: data.type,
      actorId: data.actorId,
      createdAt: data.createdAt,
      payload: { ...data.payload },
    };
  }

  static toDomain(
    raw: Prisma.RideEventGetPayload<Record<string, never>>,
  ): RideEvent {
    const payload = raw.payload;
    if (!this.isValidPayload(payload)) {
      throw new Error(ERROR_MESSAGES.RIDE_EVENT_INVALID_PAYLOAD);
    }
    return new RideEvent({
      id: raw.id,
      rideId: raw.rideId,
      type: raw.type as RideEventType,
      actorId: raw.actorId,
      createdAt: raw.createdAt,
      payload: {
        actorRole: payload.actorRole,
        previousStatus: payload.previousStatus,
        newStatus: payload.newStatus,
      },
    });
  }

  private static isValidPayload(payload: unknown): payload is RideEventPayload {
    if (
      payload === null ||
      typeof payload !== 'object' ||
      Array.isArray(payload)
    ) {
      return false;
    }

    const fields = payload as Record<string, unknown>;
    const hasValidActorRole =
      fields.actorRole === 'RIDER' || fields.actorRole === 'DRIVER';
    const hasValidPreviousStatus =
      fields.previousStatus === null || isRideStatus(fields.previousStatus);
    const hasValidNewStatus = isRideStatus(fields.newStatus);

    return hasValidActorRole && hasValidPreviousStatus && hasValidNewStatus;
  }
}
