import { Outlet } from 'react-router-dom';
import { CRideLogo } from '@/shared/components/c-ride-logo';

export function AuthLayout() {
  return (
    <main className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <CRideLogo className="text-primary-foreground [&>span:first-child]:bg-primary-foreground [&>span:first-child]:text-primary" />
        <div className="max-w-md space-y-4">
          <p className="text-4xl font-bold tracking-tight">Move with confidence</p>
          <p className="max-w-sm text-base leading-7 text-primary-foreground/80">
            Reliable rides, real-time tracking, and a safer commute for everyone.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/75">Safe · Fast · Affordable</p>
      </section>
      <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md">
          <CRideLogo className="mb-12 lg:hidden" />
          <Outlet />
        </div>
      </section>
    </main>
  );
}
