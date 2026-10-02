import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/app/layouts/AuthLayout';
import { DriverLayout } from '@/app/layouts/DriverLayout';
import { RiderLayout } from '@/app/layouts/RiderLayout';
import { RootLayout } from '@/app/layouts/RootLayout';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RiderSignupPage } from '@/pages/auth/RiderSignupPage';
import { DriverSignupPage } from '@/pages/auth/DriverSignupPage';
import { DriverHomePage } from '@/pages/driver/DriverHomePage';
import { RiderHomePage } from '@/pages/rider/RiderHomePage';
import { RidePlaceholderPage } from '@/pages/common/RidePlaceholderPage';
import { DriverRoute, ProtectedRoute, RiderRoute } from './route-guards';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'signup/rider', element: <RiderSignupPage /> },
          { path: 'signup/driver', element: <DriverSignupPage /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <RiderRoute />,
            children: [
              {
                path: 'rider',
                element: <RiderLayout />,
                children: [
                  { index: true, element: <RiderHomePage /> },
                  {
                    path: 'rides/:rideId',
                    element: <RidePlaceholderPage description="Ride tracking arrives in Phase 6." title="Your ride" />,
                  },
                ],
              },
            ],
          },
          {
            element: <DriverRoute />,
            children: [
              {
                path: 'driver',
                element: <DriverLayout />,
                children: [
                  { index: true, element: <DriverHomePage /> },
                  { path: 'onboarding', element: <DriverSignupPage /> },
                  {
                    path: 'rides/:rideId',
                    element: <RidePlaceholderPage description="Active ride management arrives in Phase 7." title="Active ride" />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
