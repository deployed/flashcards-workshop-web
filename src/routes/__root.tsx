import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

import { TanStackRouterDevtools } from '@/components/TanStackRouterDevtools';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <div className="flex gap-2 p-2">
        <Link to="/" className="font-[Jost] [&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
