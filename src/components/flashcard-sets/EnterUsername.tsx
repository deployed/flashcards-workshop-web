import { useState, type ReactNode } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/base/Button';
import {
  Dialog,
  DialogContent,
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
import { useUserContext } from '@/data/UserContext';

const formSchema = z.object({
  username: z.string().min(1, { message: 'Imię jest wymagane' }),
});
type FormSchema = z.infer<typeof formSchema>;

export type EnterUsernameProps = {
  children: ReactNode;
  onNameChosen?: (name: string) => void;
};

export function EnterUsername({ children, onNameChosen }: EnterUsernameProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { username, setUsername } = useUserContext();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username,
    },
  });

  const onSubmit = (data: FormSchema) => {
    setUsername(data.username);
    onNameChosen?.(data.username);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Podaj swoje imię</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imię</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Zapisz
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
