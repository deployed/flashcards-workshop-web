import { useSuspenseQuery } from '@tanstack/react-query';

import { useApiClient } from '@/hooks/useApiClient';

import { queryKeys } from '../cache-keys';
import { Endpoints } from '../endpoints';
import type { BackendFlashcardSet, FlashcardSet } from '../schema';
import type { PreloadFnParams, QueryFnParams } from '../types';

export async function flashcardSetsQuery({
  client,
  signal,
}: QueryFnParams): Promise<FlashcardSet[]> {
  const response = await client.get<BackendFlashcardSet[]>(Endpoints.flashcards.list(), { signal });

  return response.data.map((set) => ({
    ...set,
    isActive: set.is_active,
  }));
}

export function useFlashcardSetsQuery() {
  const client = useApiClient();
  return useSuspenseQuery({
    ...queryKeys.flashcardsSets.list(),
    queryFn: ({ signal }) => flashcardSetsQuery({ client, signal }),
  });
}

export async function loadFlashcardSets({ queryClient, apiClient }: PreloadFnParams) {
  await queryClient.ensureQueryData({
    ...queryKeys.flashcardsSets.list(),
    queryFn: ({ signal }) => flashcardSetsQuery({ client: apiClient, signal }),
  });
}

export async function flashcardSetDetails({
  client,
  signal,
  id,
}: QueryFnParams<{ id: string }>): Promise<FlashcardSet> {
  const response = await client.get<BackendFlashcardSet>(Endpoints.flashcards.details(id), {
    signal,
  });

  return {
    ...response.data,
    isActive: response.data.is_active,
  };
}

export function useFlashcardSetDetails({ id }: { id: string }) {
  const client = useApiClient();

  return useSuspenseQuery({
    ...queryKeys.flashcardsSets.details(id),
    queryFn: ({ signal }) => flashcardSetDetails({ client, signal, id }),
  });
}

export async function loadFlashcardSetDetails({
  queryClient,
  apiClient,
  id,
}: PreloadFnParams & { id: string }) {
  await queryClient.ensureQueryData({
    ...queryKeys.flashcardsSets.details(id),
    queryFn: ({ signal }) => flashcardSetDetails({ client: apiClient, signal, id }),
  });
}
