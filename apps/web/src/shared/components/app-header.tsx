import { Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { CRideLogo } from './c-ride-logo';

export type AppNavigationItem = {
  label: string;
  to: string;
  activePathPrefix?: string;
};

type AppHeaderProps = {
  navigation: AppNavigationItem[];
  userName?: string;
};

export function AppHeader({ navigation, userName = 'User' }: AppHeaderProps) {
  const { pathname } = useLocation();
  const initials = userName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <CRideLogo />
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 sm:flex"
        >
          {navigation.map((item) => (
            <Button
              asChild
              className={cn(
                'text-muted-foreground',
                (pathname === item.to ||
                  (item.activePathPrefix !== undefined &&
                    pathname.startsWith(item.activePathPrefix))) &&
                  'bg-accent text-accent-foreground',
              )}
              key={item.to}
              size="sm"
              variant="ghost"
            >
              <Link to={item.to}>{item.label}</Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button aria-label="Notifications" size="icon" variant="ghost">
            <Bell />
          </Button>
          <Avatar className="size-8">
            <AvatarFallback className="bg-accent text-xs font-semibold text-accent-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
