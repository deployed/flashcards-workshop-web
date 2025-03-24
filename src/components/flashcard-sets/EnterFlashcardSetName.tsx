import { type ReactNode, useId, useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { Button } from '@/components/base/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/base/Dialog';
import { Input } from '@/components/base/Input';

export type EnterFlashcardSetNameProps = {
  children: ReactNode;
  onSetName?: (name: string) => void;
};

export function EnterFlashcardSetName({ children, onSetName }: EnterFlashcardSetNameProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const formId = useId();
  const { t } = useTranslation('sets');
  useEffect(() => {
    if (dialogOpen) {
      // Reset the name when the dialog is opened
      setName('');
    }
  }, [dialogOpen]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('dialog.pickName.title')}</DialogTitle>
        </DialogHeader>
        <form
          id={formId}
          onSubmit={(e) => {
            e.preventDefault();
            onSetName?.(name);
            setDialogOpen(false);
          }}
        >
          <Input
            placeholder={t('dialog.pickName.placeholder')}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </form>

        <DialogFooter className="flex flex-row justify-between">
          <Button variant="outlined" onClick={() => setDialogOpen(false)}>
            {t('dialog.pickName.cancel')}
          </Button>
          <Button type="submit" form={formId}>
            {t('dialog.pickName.create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
