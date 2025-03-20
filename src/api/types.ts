import type { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, GenericAbortSignal } from 'axios';

export type QueryFnParams<ExtraData = object> = {
  client: AxiosInstance;
  signal?: GenericAbortSignal;
} & ExtraData;

export type MutationArgs<ExtraData = object> = {
  onError?: (error: Error) => MaybePromise<void>;
  onSuccess?: () => MaybePromise<void>;
  onSettled?: () => MaybePromise<void>;
  onMutate?: () => MaybePromise<void>;
} & ExtraData;

export type PreloadFnParams<ExtraData = object> = {
  apiClient: AxiosInstance;
  queryClient: QueryClient;
} & ExtraData;
