import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { useApiClient } from '@/api/apiClient';
import { queryKeys } from '@/api/cache-keys';
import type { QueryOptionsParams, PreloadFnParams } from '@/api/types';

import {
  type FlashcardDetailsQueryParams,
  flashcardSetDetails,
  flashcardSetsQuery,
} from '../flashcards-sets';

function flashcardSetsQueryOptions({ client }: QueryOptionsParams) {
  return queryOptions({
    ...queryKeys.flashcardsSets.list(),
    queryFn: ({ signal }) => flashcardSetsQuery({ client, signal }),
  });
}

export function useFlashcardSetsQuery() {
  const client = useApiClient();
  return useSuspenseQuery(flashcardSetsQueryOptions({ client }));
}

export async function loadFlashcardSets({ queryClient, apiClient }: PreloadFnParams) {
  await queryClient.ensureQueryData(flashcardSetsQueryOptions({ client: apiClient }));
}

function flashcardSetDetailsQueryOptions({
  client,
  id,
}: QueryOptionsParams<FlashcardDetailsQueryParams>) {
  return queryOptions({
    ...queryKeys.flashcardsSets.details(id),
    queryFn: ({ signal }) => flashcardSetDetails({ client, signal, id }),
  });
}

export function useFlashcardSetDetails({ id }: FlashcardDetailsQueryParams) {
  const client = useApiClient();
  return useSuspenseQuery(flashcardSetDetailsQueryOptions({ client, id }));
}

export async function loadFlashcardSetDetails({
  queryClient,
  apiClient,
  id,
}: PreloadFnParams<FlashcardDetailsQueryParams>) {
  await queryClient.ensureQueryData(flashcardSetDetailsQueryOptions({ client: apiClient, id }));
}
