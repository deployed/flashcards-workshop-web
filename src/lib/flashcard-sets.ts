import { useState, useCallback, useEffect } from 'react';

import {
  useFlashcardCreate,
  useFlashcardDelete,
  useFlashcardUpdate,
} from '@/api/mutations/hooks/useFlashcardMutation';
import { useFlashcardsQuery } from '@/api/query/hooks/useFlashcards';

export function useFlashcardSetEditor({ id }: { id: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashcardFrontValue, setFlashcardFrontValue] = useState('');
  const [flashcardBackValue, setFlashcardBackValue] = useState('');
  const { data: flashcards } = useFlashcardsQuery({ setId: id });
  const { mutateAsync: createFlashcard } = useFlashcardCreate({ setId: id });
  const { mutateAsync: updateFlashcard } = useFlashcardUpdate({ setId: id });
  const { mutateAsync: deleteFlashcardMutation } = useFlashcardDelete({ setId: id });

  const backendFlashcardId = flashcards.at(currentIndex)?.id;
  const backendFrontValue = flashcards.at(currentIndex)?.question;
  const backendBackValue = flashcards.at(currentIndex)?.answer;
  const isFlashcardChanged =
    backendFrontValue !== flashcardFrontValue || backendBackValue !== flashcardBackValue;
  const isPendingForCreate = backendFlashcardId == null;

  const hasPreviousFlashcard = currentIndex > 0;
  const hasNextFlashcard = currentIndex < flashcards.length - 1;
  const isValid = flashcardFrontValue && flashcardBackValue;
  const backendFlashcardCount = flashcards.length;
  const flashcardCount =
    backendFlashcardCount >= currentIndex + 1 ? backendFlashcardCount : currentIndex + 1;
  const canDeleteFlashcard = !isPendingForCreate;
  const deleteIndexDirection = currentIndex > 0 ? -1 : 0;

  // If current index changes, update the flashcard values to match the backend
  useEffect(() => {
    setFlashcardFrontValue(backendFrontValue ?? '');
    setFlashcardBackValue(backendBackValue ?? '');
  }, [currentIndex, backendFrontValue, backendBackValue]);

  const saveFlashcard = useCallback(async () => {
    if (isFlashcardChanged) {
      if (backendFlashcardId) {
        console.log('Updating flashcard');
        await updateFlashcard({
          flashcardId: backendFlashcardId.toString(),
          data: {
            question: flashcardFrontValue,
            answer: flashcardBackValue,
          },
        });
      } else if (isValid) {
        console.log('Creating flashcard');
        await createFlashcard({
          question: flashcardFrontValue,
          answer: flashcardBackValue,
        });
      }
    }
  }, [
    isFlashcardChanged,
    updateFlashcard,
    backendFlashcardId,
    flashcardFrontValue,
    flashcardBackValue,
    createFlashcard,
    isValid,
  ]);

  const nextFlashcard = useCallback(async () => {
    void saveFlashcard();
    if (!hasNextFlashcard) {
      setFlashcardFrontValue('');
      setFlashcardBackValue('');
    }
    setCurrentIndex((prev) => prev + 1);
  }, [saveFlashcard, hasNextFlashcard]);

  const previousFlashcard = useCallback(() => {
    void saveFlashcard();
    if (hasPreviousFlashcard) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [saveFlashcard, hasPreviousFlashcard]);

  const deleteFlashcard = useCallback(async () => {
    if (canDeleteFlashcard) {
      setCurrentIndex((prev) => prev + deleteIndexDirection);
      await deleteFlashcardMutation(backendFlashcardId.toString());
    }
  }, [canDeleteFlashcard, deleteFlashcardMutation, backendFlashcardId, deleteIndexDirection]);

  return {
    currentIndex,
    nextFlashcard,
    previousFlashcard,
    hasPreviousFlashcard,
    flashcardBackValue,
    flashcardFrontValue,
    changeFrontValue: setFlashcardFrontValue,
    changeBackValue: setFlashcardBackValue,
    deleteFlashcard,
    saveFlashcard,
    flashcardCount,
    isValid,
    isPendingForCreate,
    canDeleteFlashcard,
  };
}
