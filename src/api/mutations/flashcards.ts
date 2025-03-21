import { Endpoints } from '@/api/endpoints';
import type { BackendFlashcard, CreateFlashcardPayload } from '@/api/schema';
import type { QueryFnParams } from '@/api/types';

export type CreateFlashcard = Omit<CreateFlashcardPayload, 'flashcard_set'>;
export type CreateFlashcardParams = {
  data: CreateFlashcard;
  setId: string;
};

export async function createFlashcard({
  client,
  signal,
  data,
  setId,
}: QueryFnParams<CreateFlashcardParams>) {
  const response = await client.post<BackendFlashcard>(
    Endpoints.flashcardSets.for(setId).flashcards.create(),
    {
      ...data,
      flashcard_set: setId,
    } satisfies CreateFlashcardPayload,
    { signal },
  );

  return response.data;
}

export type DeleteFlashcardParams = {
  setId: string;
  flashcardId: string;
};

export async function deleteFlashcard({
  client,
  signal,
  setId,
  flashcardId,
}: QueryFnParams<DeleteFlashcardParams>) {
  await client.delete(Endpoints.flashcardSets.for(setId).flashcards.delete(flashcardId), {
    signal,
  });
}

export type UpdateFlashcard = Omit<CreateFlashcardPayload, 'flashcard_set'>;

export type UpdateFlashcardParams = {
  data: UpdateFlashcard;
  setId: string;
  flashcardId: string;
};

export async function updateFlashcard({
  client,
  signal,
  setId,
  data,
  flashcardId,
}: QueryFnParams<UpdateFlashcardParams>) {
  const response = await client.put<BackendFlashcard>(
    Endpoints.flashcardSets.for(setId).flashcards.update(flashcardId),
    { ...data, flashcard_set: setId } satisfies CreateFlashcardPayload,
    { signal },
  );

  return response.data;
}
