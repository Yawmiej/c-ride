import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import type { UserRole } from '../types/auth.types';

type RoleSelectorProps = {
  value: UserRole;
  onValueChange: (role: UserRole) => void;
};

export function RoleSelector({ value, onValueChange }: RoleSelectorProps) {
  return (
    <Tabs onValueChange={(nextValue) => onValueChange(nextValue as UserRole)} value={value}>
      <TabsList className="grid h-10 w-full grid-cols-2 p-1">
        <TabsTrigger
          className="h-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          value="RIDER"
        >
          Rider
        </TabsTrigger>
        <TabsTrigger
          className="h-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          value="DRIVER"
        >
          Driver
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
