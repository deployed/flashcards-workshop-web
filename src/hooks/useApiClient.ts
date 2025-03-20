import { useMemo } from 'react';

import { createApiClient } from '@/api/apiClient';

export function useApiClient() {
  return useMemo(() => createApiClient(), []);
}
