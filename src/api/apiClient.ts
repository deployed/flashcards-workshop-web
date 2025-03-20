import axios from 'axios';

import { API_URL } from '@/env';

export function createApiClient() {
  const apiClient = axios.create({
    baseURL: API_URL,
  });

  return apiClient;
}
