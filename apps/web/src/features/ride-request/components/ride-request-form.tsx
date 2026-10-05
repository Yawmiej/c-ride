import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { ButtonLoading } from '@/shared/components/button-loading';
import { FieldError } from '@/shared/components/ui/field';
import type { RideRequestValues } from '../schemas/ride-request.schema';
import { LocationField } from './location-field';
import { RideOption } from './ride-option';

type RideRequestFormProps = {
  pending: boolean;
  disabled: boolean;
  error?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export function RideRequestForm({
  pending,
  disabled,
  error,
  onSubmit,
}: RideRequestFormProps) {
  const { control } = useFormContext<RideRequestValues>();
  const dropoff = useWatch({ control, name: 'dropoff' });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-8 p-6 sm:p-8 lg:py-12"
    >
      <h1 className="text-2xl font-semibold tracking-tight">
        Where are you going?
      </h1>
      <div className="space-y-5">
        <Controller
          control={control}
          name="pickup"
          render={({ field, fieldState }) => (
            <LocationField
              id="pickup"
              label="Pickup location"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              inputRef={field.ref}
              error={fieldState.error?.message}
              disabled={disabled || pending}
            />
          )}
        />
        <Controller
          control={control}
          name="dropoff"
          render={({ field, fieldState }) => (
            <LocationField
              id="dropoff"
              label="Dropoff location"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              inputRef={field.ref}
              error={fieldState.error?.message}
              disabled={disabled || pending}
            />
          )}
        />
      </div>
      <RideOption showPrice={Boolean(dropoff)} />
      <div className="mt-auto space-y-3">
        <FieldError>{error}</FieldError>
        <ButtonLoading
          type="submit"
          className="h-12 w-full"
          disabled={disabled}
          isLoading={pending}
          loadingText="Requesting ride…"
        >
          Request Ride
        </ButtonLoading>
      </div>
    </form>
  );
}
