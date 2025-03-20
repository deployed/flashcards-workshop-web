import { ComponentProps } from 'react';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '@/lib/styling';

import { ScrollBar } from './ScrollBar';

export type ScrollAreaProps = ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  scrollbarAlwaysVisible?: true;
};

export function ScrollArea({
  className,
  children,
  scrollbarAlwaysVisible,
  ...props
}: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root className={cn('relative overflow-hidden', className)} {...props}>
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar forceMount={scrollbarAlwaysVisible} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}
