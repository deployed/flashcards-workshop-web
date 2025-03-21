import { type ComponentProps } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/styling';

export const textVariants = cva('font-[Jost] text-secondary', {
  variants: {
    variant: {
      default: 'text-base font-thin',
      emphasis: 'text-2xl font-bold',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type TextProps = ComponentProps<'p'> &
  VariantProps<typeof textVariants> & {
    asChild?: boolean;
  };

export function Text({ className, variant, asChild, ...props }: TextProps) {
  const Comp = asChild ? Slot : 'p';
  return <Comp className={cn(textVariants({ variant, className }))} {...props} />;
}
