import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthHeading } from '@/features/authentication/components/auth-heading';
import { AuthProgress } from '@/features/authentication/components/auth-progress';
import { PasswordInput } from '@/features/authentication/components/password-input';
import { useDriverSignupMutation } from '@/features/authentication/queries/auth.mutations';
import { useAuthSession } from '@/features/authentication/hooks/use-auth-session';
import { driverAccountSchema } from '@/features/authentication/schemas/driver-signup.schema';
import type { RiderSignupValues } from '@/features/authentication/schemas/rider-signup.schema';
import { VehicleSelector } from '@/features/driver-onboarding/components/vehicle-selector';
import { carBrands, carColors } from '@/features/driver-onboarding/vehicle-options';
import { useVehicleOnboardingMutation } from '@/features/driver-onboarding/queries/vehicle.mutations';
import {
  vehicleOnboardingSchema,
  type VehicleOnboardingValues,
} from '@/features/driver-onboarding/schemas/vehicle-onboarding.schema';
import { getErrorMessage } from '@/shared/api';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

export function DriverSignupPage() {
  const navigate = useNavigate();
  const { data: currentUser } = useAuthSession();
  const isVehicleOnboarding = currentUser?.role === 'DRIVER';
  const [step, setStep] = useState<1 | 2>(() => (isVehicleOnboarding ? 2 : 1));
  const signup = useDriverSignupMutation();
  const vehicleOnboarding = useVehicleOnboardingMutation();
  const accountForm = useForm<RiderSignupValues>({
    resolver: zodResolver(driverAccountSchema),
    defaultValues: { fullName: '', email: '', phoneNumber: '', password: '' },
  });
  const vehicleForm = useForm<VehicleOnboardingValues>({
    resolver: zodResolver(vehicleOnboardingSchema),
    defaultValues: {
      type: undefined,
      make: '',
      model: '',
      licensePlate: '',
      color: '',
      year: '',
    },
  });

  async function createAccount(values: RiderSignupValues) {
    const [firstName = '', ...lastNameParts] = values.fullName
      .trim()
      .split(/\s+/);
    try {
      await signup.mutateAsync({
        firstName,
        lastName: lastNameParts.join(' ') || firstName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        password: values.password,
        role: 'DRIVER',
      });
      setStep(2);
    } catch (error) {
      accountForm.setError('root', {
        message: getErrorMessage(error, 'Unable to create your account.'),
      });
    }
  }

  async function completeVehicleOnboarding(values: VehicleOnboardingValues) {
    try {
      await vehicleOnboarding.mutateAsync({
        type: values.type,
        make: values.make,
        model: values.model,
        licensePlate: values.licensePlate,
        color: values.color,
        ...(values.year ? { year: Number(values.year) } : {}),
      });
      toast.success('Your vehicle is ready for C-Ride.');
      navigate('/driver', { replace: true });
    } catch (error) {
      vehicleForm.setError('root', {
        message: getErrorMessage(error, 'Unable to save your vehicle.'),
      });
    }
  }

  return (
    <div className="space-y-8">
      <AuthProgress
        currentStep={step}
        steps={['Account', 'Vehicle', 'Complete']}
      />
      {step === 1 ? (
        <DriverAccountForm
          form={accountForm}
          isPending={signup.isPending}
          onSubmit={createAccount}
        />
      ) : (
        <VehicleForm
          form={vehicleForm}
          isPending={vehicleOnboarding.isPending}
          onBack={isVehicleOnboarding ? undefined : () => setStep(1)}
          onSubmit={completeVehicleOnboarding}
        />
      )}
      {step === 1 && (
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            className="font-medium text-primary hover:underline"
            to="/login"
          >
            Sign in
          </Link>
        </p>
      )}
    </div>
  );
}

function DriverAccountForm({
  form,
  isPending,
  onSubmit,
}: {
  form: ReturnType<typeof useForm<RiderSignupValues>>;
  isPending: boolean;
  onSubmit: (values: RiderSignupValues) => Promise<void>;
}) {
  return (
    <>
      <AuthHeading
        description="Create your driver account before adding your vehicle."
        title="Join C-Ride as a driver"
      />
      <form className="mt-8 space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <TextField
          error={form.formState.errors.fullName?.message}
          id="fullName"
          label="Full name"
        >
          <Input
            autoComplete="name"
            id="fullName"
            placeholder="John Doe"
            {...form.register('fullName')}
          />
        </TextField>
        <TextField
          error={form.formState.errors.email?.message}
          id="email"
          label="Email"
        >
          <Input
            autoComplete="email"
            id="email"
            placeholder="you@example.com"
            {...form.register('email')}
          />
        </TextField>
        <TextField
          error={form.formState.errors.phoneNumber?.message}
          id="phoneNumber"
          label="Phone number"
        >
          <Input
            autoComplete="tel"
            id="phoneNumber"
            placeholder="+2348012345678"
            {...form.register('phoneNumber')}
          />
        </TextField>
        <TextField
          error={form.formState.errors.password?.message}
          id="password"
          label="Password"
        >
          <PasswordInput
            autoComplete="new-password"
            id="password"
            placeholder="Create a password"
            {...form.register('password')}
          />
        </TextField>
        {form.formState.errors.root?.message && (
          <p className="text-sm text-destructive">
            {form.formState.errors.root.message}
          </p>
        )}
        <Button size="xl" className="w-full" disabled={isPending} type="submit">
          {isPending ? 'Creating account…' : 'Continue'}
        </Button>
      </form>
    </>
  );
}

function VehicleForm({
  form,
  isPending,
  onBack,
  onSubmit,
}: {
  form: ReturnType<typeof useForm<VehicleOnboardingValues>>;
  isPending: boolean;
  onBack?: () => void;
  onSubmit: (values: VehicleOnboardingValues) => Promise<void>;
}) {
  const selectedType = form.watch('type');
  return (
    <>
      <AuthHeading
        description="Choose a car and provide its details."
        title="Tell us about your vehicle"
      />
      <form className="mt-8 space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <VehicleSelector
            onValueChange={(type) =>
              form.setValue('type', type, { shouldValidate: true })
            }
            value={selectedType}
          />
          {form.formState.errors.type?.message && (
            <p className="text-sm text-destructive">
              {form.formState.errors.type.message}
            </p>
          )}
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            error={form.formState.errors.make?.message}
            id="make"
            label="Car brand"
          >
            <Select
              onValueChange={(make) => form.setValue('make', make, { shouldValidate: true })}
              value={form.watch('make')}
            >
              <SelectTrigger aria-invalid={Boolean(form.formState.errors.make)} className="w-full" id="make">
                <SelectValue placeholder="Choose a brand" />
              </SelectTrigger>
              <SelectContent>
                {carBrands.map((brand) => <SelectItem key={brand} value={brand}>{brand}</SelectItem>)}
              </SelectContent>
            </Select>
          </TextField>
          <TextField
            error={form.formState.errors.model?.message}
            id="model"
            label="Car model"
          >
            <Input id="model" placeholder="Camry" {...form.register('model')} />
          </TextField>
          <TextField
            error={form.formState.errors.licensePlate?.message}
            id="licensePlate"
            label="License plate number"
          >
            <Input
              id="licensePlate"
              placeholder="ABC 1234"
              {...form.register('licensePlate')}
            />
          </TextField>
          <TextField
            error={form.formState.errors.color?.message}
            id="color"
            label="Car color"
          >
            <Select
              onValueChange={(color) => form.setValue('color', color, { shouldValidate: true })}
              value={form.watch('color')}
            >
              <SelectTrigger aria-invalid={Boolean(form.formState.errors.color)} className="w-full" id="color">
                <SelectValue placeholder="Choose a color" />
              </SelectTrigger>
              <SelectContent>
                {carColors.map((color) => <SelectItem key={color} value={color}>{color}</SelectItem>)}
              </SelectContent>
            </Select>
          </TextField>
          <TextField
            error={form.formState.errors.year?.message}
            id="year"
            label="Year (optional)"
          >
            <Input
              id="year"
              inputMode="numeric"
              placeholder="2022"
              {...form.register('year')}
            />
          </TextField>
        </div>
        {form.formState.errors.root?.message && (
          <p className="text-sm text-destructive">
            {form.formState.errors.root.message}
          </p>
        )}
        <div className="grid grid-cols-2 gap-3">
          {onBack && (
            <Button onClick={onBack} type="button" variant="secondary">
              Back
            </Button>
          )}
          <Button className={onBack ? '' : 'col-span-2'} size="xl" disabled={isPending} type="submit">
            {isPending ? 'Saving…' : 'Create account'}
          </Button>
        </div>
      </form>
    </>
  );
}

function TextField({
  children,
  error,
  id,
  label,
}: {
  children: React.ReactNode;
  error?: string;
  id: string;
  label: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
