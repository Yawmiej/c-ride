import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthHeading } from '@/features/authentication/components/auth-heading';
import { PasswordInput } from '@/features/authentication/components/password-input';
import { RoleSelector } from '@/features/authentication/components/role-selector';
import { useLoginMutation } from '@/features/authentication/queries/auth.mutations';
import { loginSchema, type LoginValues } from '@/features/authentication/schemas/login.schema';
import type { UserRole } from '@/features/authentication/types/auth.types';
import { getErrorMessage } from '@/shared/api';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

export function LoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>('RIDER');
  const login = useLoginMutation();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: LoginValues) {
    try {
      const response = await login.mutateAsync(values);
      toast.success(`Welcome back, ${response.user.firstName}.`);
      const destination =
        response.user.role === 'RIDER'
          ? '/rider'
          : response.user.driverProfile?.status === 'PENDING_ONBOARDING' ||
              !response.user.driverProfile?.vehicle
            ? '/driver/onboarding'
            : '/driver';
      navigate(destination, { replace: true });
    } catch (error) {
      form.setError('root', { message: getErrorMessage(error, 'Unable to sign in.') });
    }
  }

  return (
    <div className="space-y-8">
      <AuthHeading description="Sign in to your account" title="Welcome back" />
      <RoleSelector onValueChange={setSelectedRole} value={selectedRole} />
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            autoComplete="email"
            id="email"
            placeholder="you@example.com"
            {...form.register('email')}
          />
          <FieldError message={form.formState.errors.email?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            autoComplete="current-password"
            id="password"
            placeholder="Enter your password"
            {...form.register('password')}
          />
          <FieldError message={form.formState.errors.password?.message} />
        </div>
        <FieldError message={form.formState.errors.root?.message} />
        <Button className="w-full" disabled={login.isPending} type="submit">
          {login.isPending ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        New to C-Ride?{' '}
        <Link className="font-medium text-primary hover:underline" to={`/signup/${selectedRole.toLowerCase()}`}>
          Create an account
        </Link>
      </p>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-sm text-destructive">{message}</p> : null;
}
