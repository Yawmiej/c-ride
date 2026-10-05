import { Injectable } from '@nestjs/common';
import { GetRideUseCase, GetRideCommand } from './get-ride.use-case';

@Injectable()
export class AuthorizeRideRoomUseCase {
  constructor(private readonly getRide: GetRideUseCase) {}

  async execute(command: GetRideCommand): Promise<string> {
    // Reuse the same participant ownership policy as authorized ride reads.
    const ride = await this.getRide.execute(command);
    return ride.id;
  }
}
