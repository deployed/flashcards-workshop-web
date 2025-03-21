import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useApiClient } from '@/api/apiClient';
import { queryKeys } from '@/api/cache-keys';
import {
  type CreateFlashcard,
  createFlashcard,
  deleteFlashcard,
  updateFlashcard,
  type UpdateFlashcardParams,
} from '@/api/mutations/flashcards';
import type { MutationArgs } from '@/api/types';

export type FlashcardMutationParams = MutationArgs<{ setId: string }>;

export function useFlashcardCreate({ setId, onSettled, ...rest }: FlashcardMutationParams) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFlashcard) => createFlashcard({ client, setId, data }),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        ...queryKeys.flashcards.list({ setId }),
      });
      await onSettled?.();
    },
    ...rest,
  });
}

export function useFlashcardDelete({ setId, onSettled, ...rest }: FlashcardMutationParams) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (flashcardId: string) => deleteFlashcard({ client, setId, flashcardId }),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        ...queryKeys.flashcards.list({ setId }),
      });
      await onSettled?.();
    },
    ...rest,
  });
}

export function useFlashcardUpdate({ setId, onSettled, ...rest }: FlashcardMutationParams) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: Omit<UpdateFlashcardParams, 'setId'>) =>
      updateFlashcard({ client, setId, ...params }),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        ...queryKeys.flashcards.list({ setId }),
      });
      await onSettled?.();
    },
    ...rest,
  });
}
