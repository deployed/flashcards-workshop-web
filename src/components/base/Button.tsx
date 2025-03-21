import type { ButtonHTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/styling';

export const buttonVariants = cva(
  'focus-visible:ring-ring text-md inline-flex items-center justify-center gap-2 rounded-md font-[Inter] font-medium whitespace-nowrap ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 laptop:[&_svg]:size-6',
  {
    variants: {
      variant: {
        default: 'bg-primary text-neutral hover:bg-primary/90',
        outlined: 'border border-primary text-primary hover:bg-primary/10',
      },
      size: {
        default: 'h-10 min-w-[130px] px-4 py-2',
        large: 'h-10 w-[60vw] min-w-[130px] px-4 py-2 laptop:w-[30vw]',
        icon: 'h-12 w-12 rounded-full laptop:h-14 laptop:w-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
