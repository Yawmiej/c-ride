export interface FareQuote {
  amount: string;
  currency: 'NGN';
}

export const FARE_CURRENCY = 'NGN' as const;
export const FARE_AMOUNT_NGN = 1000;

export class FarePolicy {
  static calculate(): FareQuote {
    return {
      amount: FARE_AMOUNT_NGN.toFixed(2),
      currency: FARE_CURRENCY,
    };
  }
}
