import { HealthController } from './health.controller';

describe('HealthController', () => {
  const controller = new HealthController();

  it('returns ok', () => {
    expect(controller.check()).toEqual({ status: 'ok' });
  });
});
