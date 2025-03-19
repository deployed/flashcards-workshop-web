import { createRootRoute, Outlet } from '@tanstack/react-router';

import { TanStackRouterDevtools } from '@/components/development/TanStackRouterDevtools';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <div className="relative flex h-screen flex-col">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
