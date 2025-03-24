import { Endpoints } from '../endpoints';
import type { BackendFlashcard, Flashcard } from '../schema';
import type { QueryFnParams } from '../types';

export type FlashcardsInSetQueryParams = {
  setId: string;
};

export async function flashcardsInSetQuery({
  client,
  setId,
  signal,
}: QueryFnParams<FlashcardsInSetQueryParams>): Promise<Flashcard[]> {
  const response = await client.get<BackendFlashcard[]>(
    Endpoints.flashcardSets.for(setId).flashcards.list(),
    {
      signal,
    },
  );

  return response.data;
}

export type FlashcardLearnSetQueryParams = {
  setId: string;
  username: string;
};

export async function flashcardLearnSetQuery({
  client,
  signal,
  setId,
  username,
}: QueryFnParams<FlashcardLearnSetQueryParams>): Promise<Flashcard[]> {
  const response = await client.get<BackendFlashcard[]>(
    Endpoints.flashcardSets.for(setId).flashcards.learnSet(),
    {
      signal,
      params: { user: username },
    },
  );

  return response.data;
}
