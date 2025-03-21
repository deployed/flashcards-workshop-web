import type { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, GenericAbortSignal } from 'axios';

export type QueryOptionsParams<ExtraData = object> = {
  client: AxiosInstance;
} & ExtraData;

export type QueryFnParams<ExtraData = object> = QueryOptionsParams<ExtraData> & {
  signal?: GenericAbortSignal;
};

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
