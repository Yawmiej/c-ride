import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthHeading } from '@/features/authentication/components/auth-heading';
import { AuthProgress } from '@/features/authentication/components/auth-progress';
import { PasswordInput } from '@/features/authentication/components/password-input';
import { useRiderSignupMutation } from '@/features/authentication/queries/auth.mutations';
import {
  riderSignupSchema,
  type RiderSignupValues,
} from '@/features/authentication/schemas/rider-signup.schema';
import { getErrorMessage } from '@/shared/api';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

export function RiderSignupPage() {
  const navigate = useNavigate();
  const signup = useRiderSignupMutation();
  const form = useForm<RiderSignupValues>({
    resolver: zodResolver(riderSignupSchema),
    defaultValues: { fullName: '', email: '', phoneNumber: '', password: '' },
  });

  async function onSubmit(values: RiderSignupValues) {
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
        role: 'RIDER',
      });
      toast.success('Your rider account is ready.');
      navigate('/rider', { replace: true });
    } catch (error) {
      form.setError('root', {
        message: getErrorMessage(error, 'Unable to create your account.'),
      });
    }
  }

  return (
    <div className="space-y-8">
      <AuthProgress currentStep={1} steps={['Account', 'Complete']} />
      <AuthHeading
        description="Get a ride in minutes"
        title="Create your rider account"
      />
      <SignupForm
        form={form}
        isPending={signup.isPending}
        onSubmit={onSubmit}
      />
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link className="font-medium text-primary hover:underline" to="/login">
          Sign in
        </Link>
      </p>
    </div>
  );
}

type SignupFormProps = {
  form: ReturnType<typeof useForm<RiderSignupValues>>;
  isPending: boolean;
  onSubmit: (values: RiderSignupValues) => Promise<void>;
};

export function SignupForm({ form, isPending, onSubmit }: SignupFormProps) {
  return (
    <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
      <SignupField
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
      </SignupField>
      <SignupField
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
      </SignupField>
      <SignupField
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
      </SignupField>
      <SignupField
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
      </SignupField>
      {form.formState.errors.root?.message && (
        <p className="text-sm text-destructive">
          {form.formState.errors.root.message}
        </p>
      )}
      <Button size="xl" className="w-full" disabled={isPending} type="submit">
        {isPending ? 'Creating account…' : 'Create account'}
      </Button>
    </form>
  );
}

function SignupField({
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
