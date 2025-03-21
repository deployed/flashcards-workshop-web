import { Endpoints } from '../endpoints';
import type { BackendFlashcardSet, FlashcardSet } from '../schema';
import type { QueryFnParams } from '../types';

export async function flashcardSetsQuery({
  client,
  signal,
}: QueryFnParams): Promise<FlashcardSet[]> {
  const response = await client.get<BackendFlashcardSet[]>(Endpoints.flashcardSets.list(), {
    signal,
  });

  return response.data.map((set) => ({
    ...set,
    isActive: set.is_active,
  }));
}

export async function flashcardSetDetails({
  client,
  signal,
  id,
}: QueryFnParams<{ id: string }>): Promise<FlashcardSet> {
  const response = await client.get<BackendFlashcardSet>(Endpoints.flashcardSets.details(id), {
    signal,
  });

  return {
    ...response.data,
    isActive: response.data.is_active,
  };
}
