import type { ComponentProps } from 'react';

import { useRouter } from '@tanstack/react-router';

import { Button } from '@/components/base/Button';

export type BackButtonProps = ComponentProps<typeof Button>;

export function BackButton({ onClick, children, ...rest }: BackButtonProps) {
  const { history } = useRouter();

  return (
    <Button
      onClick={(e) => {
        onClick?.(e);
        history.back();
      }}
      {...rest}
    >
      {children ?? 'Powrót'}
    </Button>
  );
}
