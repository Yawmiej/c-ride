import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthSession } from '@/features/authentication/hooks/use-auth-session';
import { RidesRealtimeProvider } from '@/features/ride-realtime';
import { Skeleton } from '@/shared/components/ui/skeleton';
import type { UserRole } from '@/features/authentication/types/auth.types';

export function ProtectedRoute() {
  const { data: user, isLoading } = useAuthSession();
  const location = useLocation();

  if (isLoading) {
    return <RouteLoader />;
  }

  return user ? (
    <RidesRealtimeProvider>
      <Outlet />
    </RidesRealtimeProvider>
  ) : (
    <Navigate replace state={{ from: location }} to="/login" />
  );
}

function createRoleRoute(role: UserRole) {
  return function RoleRoute() {
    const { data: user, isLoading } = useAuthSession();
    const location = useLocation();

    if (isLoading) {
      return <RouteLoader />;
    }

    if (!user) {
      return <Navigate replace to="/login" />;
    }

    if (user.role !== role) {
      return (
        <Navigate replace to={user.role === 'RIDER' ? '/rider' : '/driver'} />
      );
    }

    if (role === 'DRIVER') {
      const needsOnboarding =
        user.driverProfile?.status === 'PENDING_ONBOARDING' ||
        !user.driverProfile?.vehicle;
      const onOnboardingRoute = location.pathname === '/driver/onboarding';

      if (needsOnboarding && !onOnboardingRoute) {
        return <Navigate replace to="/driver/onboarding" />;
      }
      if (!needsOnboarding && onOnboardingRoute) {
        return <Navigate replace to="/driver" />;
      }
    }

    return <Outlet />;
  };
}

export const RiderRoute = createRoleRoute('RIDER');
export const DriverRoute = createRoleRoute('DRIVER');

function RouteLoader() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 sm:px-6">
      <Skeleton className="h-32 w-full" />
    </main>
  );
}
