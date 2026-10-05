import { Injectable } from '@nestjs/common';
import {
  RideRepository,
  RideHistoryQuery,
  RideHistoryResult,
} from '../../domain/repositories/ride.repository';

export interface ListRideHistoryResult extends RideHistoryResult {
  page: number;
  limit: number;
}

@Injectable()
export class ListRideHistoryUseCase {
  constructor(private readonly rides: RideRepository) {}

  async execute(query: RideHistoryQuery): Promise<ListRideHistoryResult> {
    const result = await this.rides.listHistory(query);
    return { ...result, page: query.page, limit: query.limit };
  }
}
