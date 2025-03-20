import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import type { AxiosInstance } from 'axios';

import { TanStackRouterDevtools } from '@/components/development/TanStackRouterDevtools';

type RouterContext = {
  queryClient: QueryClient;
  apiClient: AxiosInstance;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <div className="relative flex h-screen max-h-screen flex-col overflow-hidden">
        <Outlet />
      </div>
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  );
}
