import type { ReactNode } from 'react';

import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/base/Text';

export function Logo() {
  const { t } = useTranslation('common');

  return (
    <Link to="/" className="relative flex max-w-[80vw] items-center justify-center p-5 px-28">
      <p className="font-[Josefin Sans] text-5xl font-bold text-neutral">{t('logo.title')}</p>
      <div className="full-parent">
        <div className="absolute top-0 right-0 z-background h-3/5 w-[90%] rounded-xl bg-secondary" />
        <div className="absolute bottom-0 left-0 z-background h-3/5 w-[90%] rounded-xl bg-secondary" />
      </div>
    </Link>
  );
}

export type LogoWithTestProps = {
  children: ReactNode;
};

export function LogoWithText({ children }: LogoWithTestProps) {
  return (
    <div className="flex flex-col items-center gap-content">
      <Logo />
      <Text className="max-w-[200px] text-center laptop:max-w-full laptop:text-3xl">
        {children}
      </Text>
    </div>
  );
}
