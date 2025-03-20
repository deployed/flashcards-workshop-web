import type { ReactNode } from 'react';

import { Logo } from './Logo';
import { Text } from './Text';

export type LogoWithTestProps = {
  children: ReactNode;
};

export function LogoWithText({ children }: LogoWithTestProps) {
  return (
    <div className="flex flex-col items-center gap-content">
      <Logo />
      <Text className="max-w-[200px] text-center laptop:max-w-full">{children}</Text>
    </div>
  );
}
