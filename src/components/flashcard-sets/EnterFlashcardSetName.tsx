import { type ReactNode, useId, useState, useEffect } from 'react';

import { Button } from '../Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../Dialog';
import { Input } from '../Input';

export type EnterFlashcardSetNameProps = {
  children: ReactNode;
  onSetName?: (name: string) => void;
};

export function EnterFlashcardSetName({ children, onSetName }: EnterFlashcardSetNameProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const formId = useId();

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
          <DialogTitle>Podaj nazwe zestawu</DialogTitle>
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
            placeholder="Nazwa zestawu fiszek"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </form>

        <DialogFooter className="flex flex-row justify-between">
          <Button variant="outlined" onClick={() => setDialogOpen(false)}>
            Anuluj
          </Button>
          <Button type="submit" form={formId}>
            Stwórz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
