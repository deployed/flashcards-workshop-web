import { StrictMode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';

import { queryClient } from '@/api/queryClient';

import { createApiClient } from './api/apiClient';
import './i18n';
// Import the generated route tree
import { routeTree } from './routeTree.gen';
import './styles/main.css';

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    apiClient: createApiClient(),
  },
  // When using react query, we don't want loader calls to ever be stale
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
}
