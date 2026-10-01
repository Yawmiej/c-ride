import { Outlet } from 'react-router-dom';

export function DriverLayout() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Outlet />
    </main>
  );
}
