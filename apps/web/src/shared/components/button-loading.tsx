import { LoaderCircle } from 'lucide-react';
import type { ComponentProps } from 'react';
import { Button } from './ui/button';

type ButtonLoadingProps = Omit<ComponentProps<typeof Button>, 'asChild'> & {
  isLoading: boolean;
  loadingText: string;
};

export function ButtonLoading({
  isLoading,
  loadingText,
  disabled,
  children,
  ...props
}: ButtonLoadingProps) {
  return (
    <Button {...props} disabled={disabled || isLoading} aria-busy={isLoading}>
      {isLoading && (
        <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
      )}
      {isLoading ? loadingText : children}
    </Button>
  );
}
