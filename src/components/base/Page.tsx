import type { ComponentProps } from 'react';

import { cn } from '@/lib/styling';

export type PageProps = ComponentProps<'main'>;

export function Page({ children, className, ...rest }: PageProps) {
  return (
    <main
      className={cn(
        'relative flex h-full max-h-full flex-col items-center justify-start gap-8 py-15 laptop:gap-[8vh]',
        className,
      )}
      {...rest}
    >
      {children}
    </main>
  );
}

export type PageContentProps = ComponentProps<'div'>;

export function PageContent({ children, className, ...rest }: PageContentProps) {
  return (
    <div
      className={cn(
        'flex min-h-0 grow flex-col items-center justify-between gap-16 laptop:gap-28',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
