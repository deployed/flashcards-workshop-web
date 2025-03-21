import type { ChangeEvent } from 'react';

import { Text } from '@/components/base/Text';
import { cn } from '@/lib/styling';

export type FlashcardProps = {
  type: 'front' | 'back';
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function Flashcard({ type, value, onChange }: FlashcardProps) {
  const headerName = type === 'front' ? 'Awers' : 'Rewers';
  return (
    <div className="flex flex-col items-start">
      <div className="bg-secondary">
        <Text variant="emphasis" className="w-[100px] py-1 text-center text-xl text-neutral">
          {headerName}
        </Text>
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={cn(
          'flex h-[130px] w-[270px] flex-col items-start border-2 text-center drop-shadow-lg',
          'focus-visible:ring-2 focus-visible:ring-secondary/70 focus-visible:outline-none',
          {
            'border-card-primary/70 bg-card-primary': type === 'front',
            'border-card-secondary/70 bg-card-secondary': type === 'back',
          },
        )}
      />
    </div>
  );
}
