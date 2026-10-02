import { Check } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

type AuthProgressProps = {
  currentStep: number;
  steps: string[];
};

export function AuthProgress({ currentStep, steps }: AuthProgressProps) {
  return (
    <ol className="flex items-center gap-2 text-xs text-muted-foreground">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const complete = stepNumber < currentStep;
        const active = stepNumber === currentStep;

        return (
          <li className="flex min-w-0 items-center gap-2" key={step}>
            {index > 0 && <span aria-hidden className="h-px w-5 bg-border sm:w-8" />}
            <span
              className={cn(
                'flex size-5 shrink-0 items-center justify-center rounded-full border text-[0.6875rem] font-semibold',
                (active || complete) && 'border-primary bg-primary text-primary-foreground',
              )}
            >
              {complete ? <Check className="size-3" /> : stepNumber}
            </span>
            <span className={cn('truncate', active && 'font-medium text-foreground')}>{step}</span>
          </li>
        );
      })}
    </ol>
  );
}
