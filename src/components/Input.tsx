import * as React from 'react';

import { cn } from '@/lib/styling';

export type InputProps = React.ComponentProps<'input'>;

export function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        'border-input focus-visible:ring-ring flex h-10 w-full rounded-md border border-border bg-interactive px-3 py-2 text-base ring-offset-neutral placeholder:text-muted-foreground',
        'focus-visible:ring-2 focus-visible:ring-secondary/70 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  );
}
