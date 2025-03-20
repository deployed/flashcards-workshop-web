import { ComponentProps } from 'react';

import { useRouter } from '@tanstack/react-router';

import { Button } from './Button';

export type BackButtonProps = Omit<ComponentProps<typeof Button>, 'onClick' | 'children'>;

export function BackButton(props: BackButtonProps) {
  const { history } = useRouter();

  return (
    <Button
      onClick={() => {
        history.back();
      }}
      {...props}
    >
      Powrót
    </Button>
  );
}
