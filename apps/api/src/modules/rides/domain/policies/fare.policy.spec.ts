import { FARE_AMOUNT_NGN, FARE_CURRENCY, FarePolicy } from './fare.policy';

describe('FarePolicy', () => {
  it('calculates the assessment fare in naira', () => {
    expect(FarePolicy.calculate()).toEqual({
      amount: `${FARE_AMOUNT_NGN}.00`,
      currency: FARE_CURRENCY,
    });
  });
});
