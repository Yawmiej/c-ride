import { Outlet } from 'react-router-dom';

export function RiderLayout() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Outlet />
    </main>
  );
}
