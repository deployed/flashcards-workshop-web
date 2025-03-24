import type { ComponentProps } from 'react';

import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/base/Button';

export type BackButtonProps = ComponentProps<typeof Button>;

export function BackButton({ onClick, children, ...rest }: BackButtonProps) {
  const { history } = useRouter();
  const { t } = useTranslation('common');
  return (
    <Button
      onClick={(e) => {
        onClick?.(e);
        history.back();
      }}
      {...rest}
    >
      {children ?? t('back')}
    </Button>
  );
}
