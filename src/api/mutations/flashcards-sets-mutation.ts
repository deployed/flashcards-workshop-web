import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useApiClient } from '@/hooks/useApiClient';

import { queryKeys } from '../cache-keys';
import { Endpoints } from '../endpoints';
import type { BackendFlashcardSet, CreateFlashcardSetPayload, FlashcardSet } from '../schema';
import type { MutationArgs, QueryFnParams } from '../types';

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

export function useCreateFlashcardSet({ onSuccess, ...rest }: MutationArgs = {}) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFlashcardSet) => createFlashcardSet({ client, data }),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.flashcardsSets._def,
      });
      await onSuccess?.();
    },
    ...rest,
  });
}
