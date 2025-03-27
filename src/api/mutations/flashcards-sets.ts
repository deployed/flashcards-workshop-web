import { Endpoints } from '../endpoints';
import type { BackendFlashcardSet, CreateFlashcardSetPayload, FlashcardSet } from '../schema';
import type { QueryFnParams } from '../types';

export type CreateFlashcardSet = CreateFlashcardSetPayload;

export async function createFlashcardSet({
  client,
  signal,
  data,
}: QueryFnParams<{ data: CreateFlashcardSet }>): Promise<FlashcardSet> {
  const response = await client.post<BackendFlashcardSet>(Endpoints.flashcardSets.create(), data, {
    signal,
  });

  return response.data;
}

export type DeleteFlashcardSetParams = { id: string };

export async function deleteFlashcardSet({
  client,
  signal,
  id,
}: QueryFnParams<DeleteFlashcardSetParams>) {
  await client.delete(Endpoints.flashcardSets.delete(id), { signal });
}
