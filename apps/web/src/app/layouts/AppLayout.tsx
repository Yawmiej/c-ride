import { Outlet } from 'react-router-dom';
import {
  AppHeader,
  type AppNavigationItem,
} from '@/shared/components/app-header';

type AppLayoutProps = {
  navigation: AppNavigationItem[];
  userName?: string;
};

export function AppLayout({ navigation, userName }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader navigation={navigation} userName={userName} />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}
