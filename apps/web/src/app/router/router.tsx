import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/app/layouts/AuthLayout';
import { DriverLayout } from '@/app/layouts/DriverLayout';
import { RiderLayout } from '@/app/layouts/RiderLayout';
import { RootLayout } from '@/app/layouts/RootLayout';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { DriverHomePage } from '@/pages/driver/DriverHomePage';
import { RiderHomePage } from '@/pages/rider/RiderHomePage';

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
          { path: 'register', element: <RegisterPage /> },
        ],
      },
      {
        path: 'rider',
        element: <RiderLayout />,
        children: [{ index: true, element: <RiderHomePage /> }],
      },
      {
        path: 'driver',
        element: <DriverLayout />,
        children: [{ index: true, element: <DriverHomePage /> }],
      },
    ],
  },
]);
