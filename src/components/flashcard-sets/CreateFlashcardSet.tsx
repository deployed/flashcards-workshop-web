import type { ReactNode } from 'react';

import { useNavigate } from '@tanstack/react-router';

import { useCreateFlashcardSet } from '@/api/mutations/hooks/useFlashcardSetsMutation';
import { EnterFlashcardSetName } from '@/components/flashcard-sets/EnterFlashcardSetName';

export type CreateFlashcardSetProps = {
  children: ReactNode;
};

export function CreateFlashcardSet({ children }: CreateFlashcardSetProps) {
  const { mutateAsync: createFlashcardSet } = useCreateFlashcardSet();
  const navigate = useNavigate();

  const handleSetCreation = async (name: string) => {
    const { id } = await createFlashcardSet({ title: name });
    await navigate({ to: `/sets/$setId`, params: { setId: id.toString() } });
  };

  return <EnterFlashcardSetName onSetName={handleSetCreation}>{children}</EnterFlashcardSetName>;
}
