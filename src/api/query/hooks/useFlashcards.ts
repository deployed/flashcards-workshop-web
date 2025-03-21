import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { useApiClient } from '@/api/apiClient';
import { queryKeys } from '@/api/cache-keys';
import { flashcardsInSetQuery } from '@/api/query/flashcards';
import type { PreloadFnParams, QueryOptionsParams } from '@/api/types';

function flashcardsQueryOptions({ client, setId }: QueryOptionsParams<{ setId: string }>) {
  return queryOptions({
    ...queryKeys.flashcards.list({ setId }),
    queryFn: ({ signal }) => flashcardsInSetQuery({ client, setId, signal }),
  });
}

export function useFlashcardsQuery({ setId }: { setId: string }) {
  const client = useApiClient();
  return useSuspenseQuery(flashcardsQueryOptions({ client, setId }));
}

export async function loadFlashcards({
  queryClient,
  apiClient,
  setId,
}: PreloadFnParams<{ setId: string }>) {
  await queryClient.ensureQueryData(flashcardsQueryOptions({ client: apiClient, setId }));
}
