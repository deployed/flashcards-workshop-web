import type { ComponentProps, HTMLAttributes } from 'react';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { buttonVariants } from '@/components/base/Button';
import { cn } from '@/lib/styling';

export const AlertDialog = AlertDialogPrimitive.Root;

export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

export const AlertDialogPortal = AlertDialogPrimitive.Portal;

export type AlertDialogOverlayProps = ComponentProps<typeof AlertDialogPrimitive.Overlay>;
export function AlertDialogOverlay({ className, ...props }: AlertDialogOverlayProps) {
  return (
    <AlertDialogPrimitive.Overlay
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
        className,
      )}
      {...props}
    />
  );
}

export type AlertDialogContentProps = ComponentProps<typeof AlertDialogPrimitive.Content>;
export function AlertDialogContent({ className, ...props }: AlertDialogContentProps) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        className={cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-neutral p-6 shadow-lg duration-200',
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

export type AlertDialogHeaderProps = HTMLAttributes<HTMLDivElement>;
export function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return (
    <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
  );
}

export type AlertDialogFooterProps = HTMLAttributes<HTMLDivElement>;
export function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return (
    <div
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
      {...props}
    />
  );
}

export type AlertDialogTitleProps = ComponentProps<typeof AlertDialogPrimitive.Title>;
export function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return (
    <AlertDialogPrimitive.Title
      className={cn('text-lg font-semibold text-secondary', className)}
      {...props}
    />
  );
}

export type AlertDialogDescriptionProps = ComponentProps<typeof AlertDialogPrimitive.Description>;
export function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  return (
    <AlertDialogPrimitive.Description
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export type AlertDialogActionProps = ComponentProps<typeof AlertDialogPrimitive.Action>;
export function AlertDialogAction({ className, ...props }: AlertDialogActionProps) {
  return <AlertDialogPrimitive.Action className={cn(buttonVariants(), className)} {...props} />;
}

export type AlertDialogCancelProps = ComponentProps<typeof AlertDialogPrimitive.Cancel>;
export function AlertDialogCancel({ className, ...props }: AlertDialogCancelProps) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: 'outlined' }), 'mt-2 sm:mt-0', className)}
      {...props}
    />
  );
}
