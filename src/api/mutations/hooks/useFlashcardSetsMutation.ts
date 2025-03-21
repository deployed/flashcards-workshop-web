import { useQueryClient, useMutation } from '@tanstack/react-query';

import { useApiClient } from '@/api/apiClient';
import { queryKeys } from '@/api/cache-keys';
import type { MutationArgs } from '@/api/types';

import { type CreateFlashcardSet, createFlashcardSet } from '../flashcards-sets';

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
