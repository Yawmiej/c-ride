export const rideKeys = {
  detail: (id: string) => ['rides', 'detail', id] as const,
  history: () => ['rides', 'history'] as const,
};
