import type { ReactNode } from 'react';

import { useTranslation } from 'react-i18next';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/base/AlertDialog';

export type ConfirmFlashcardSetDeletionProps = {
  children: ReactNode;
  onConfirm: VoidFunction;
};

export function ConfirmFlashcardSetDeletion({
  children,
  onConfirm,
}: ConfirmFlashcardSetDeletionProps) {
  const { t } = useTranslation('sets');

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('dialog.deleteSet.title')}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('dialog.deleteSet.cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{t('dialog.deleteSet.delete')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
