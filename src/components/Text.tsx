import { type ComponentProps } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/styling';

export const textVariants = cva('text-secondary font-[Jost]', {
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

export type TextProps = ComponentProps<'p'> & VariantProps<typeof textVariants>;

export function Text({ className, variant, ...props }: TextProps) {
  return <p className={cn(textVariants({ variant, className }))} {...props} />;
}
