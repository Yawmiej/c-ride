export abstract class DriverEligibility {
  abstract execute(userId: string): Promise<boolean>;
}
