import type { ComponentProps } from 'react';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '@/lib/styling';

type ScrollBarProps = ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>;

function ScrollBar({ className, orientation = 'vertical', ...props }: ScrollBarProps) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      orientation={orientation}
      className={cn(
        'flex touch-none transition-colors select-none',
        orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
        orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-primary" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

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
