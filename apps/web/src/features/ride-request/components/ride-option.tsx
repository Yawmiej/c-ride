export function RideOption({ showPrice }: { showPrice: boolean }) {
  return (
    <section aria-labelledby="ride-options-heading" className="space-y-3">
      <h2 id="ride-options-heading" className="text-sm font-semibold">
        Ride options
      </h2>
      <div className="flex items-center gap-3 rounded-lg border border-primary bg-accent/30 p-3">
        <img
          src="/images/sedan.webp"
          alt=""
          className="h-12 w-20 object-contain"
        />
        <div className="flex-1">
          <p className="text-sm font-semibold">Standard</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Affordable, everyday rides
          </p>
        </div>
        {showPrice && (
          <p
            role="status"
            className="text-right text-sm font-semibold tabular-nums"
          >
            ₦1,000.00
          </p>
        )}
      </div>
    </section>
  );
}
