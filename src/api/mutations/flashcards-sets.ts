import { Endpoints } from '../endpoints';
import type { BackendFlashcardSet, CreateFlashcardSetPayload, FlashcardSet } from '../schema';
import type { QueryFnParams } from '../types';

export type CreateFlashcardSet = CreateFlashcardSetPayload;

export async function createFlashcardSet({
  client,
  signal,
  data,
}: QueryFnParams & { data: CreateFlashcardSet }): Promise<FlashcardSet> {
  const response = await client.post<BackendFlashcardSet>(Endpoints.flashcards.create(), data, {
    signal,
  });

  return {
    ...response.data,
    isActive: response.data.is_active,
  };
}
