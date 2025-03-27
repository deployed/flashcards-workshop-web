import { type ReactNode, useId, useState, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { Button } from '@/components/base/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/base/Dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/base/Form';
import { Input } from '@/components/base/Input';

const formSchema = z.object({
  name: z.string().min(1, { message: 'dialog.pickName.nameIsRequired' }),
});
type FormSchema = z.infer<typeof formSchema>;

export type EnterFlashcardSetNameProps = {
  children: ReactNode;
  onSetName?: (name: string) => void;
};

export function EnterFlashcardSetName({ children, onSetName }: EnterFlashcardSetNameProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const formId = useId();
  const { t } = useTranslation('sets');
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = ({ name }: FormSchema) => {
    setDialogOpen(false);
    onSetName?.(name);
  };

  useEffect(() => {
    if (dialogOpen) {
      // Reset the name when the dialog is opened
      form.reset();
    }
  }, [dialogOpen, form, form.reset]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('dialog.pickName.title')}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('dialog.pickName.name')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

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
