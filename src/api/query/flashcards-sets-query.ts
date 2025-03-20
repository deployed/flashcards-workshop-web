import { type QueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { useApiClient } from '@/hooks/useApiClient';

import { createApiClient } from '../apiClient';
import { queryKeys } from '../cache-keys';
import { Endpoints } from '../endpoints';
import type { BackendFlashCardSet } from '../schema';
import { QueryFnParams } from '../types';

export async function flashcardSetsQuery({ client, signal }: QueryFnParams) {
  const response = await client.get<BackendFlashCardSet[]>(Endpoints.flashcards.list(), { signal });
  return response.data;
}

export function useFlashcardSetsQuery() {
  const client = useApiClient();
  return useSuspenseQuery({
    ...queryKeys.flashcardsSets.list(),
    queryFn: ({ signal }) => flashcardSetsQuery({ client, signal }),
  });
}

export async function loadFlashcardSets(queryClient: QueryClient) {
  const client = createApiClient();

  await queryClient.ensureQueryData({
    ...queryKeys.flashcardsSets.list(),
    queryFn: ({ signal }) => flashcardSetsQuery({ client, signal }),
  });
}
