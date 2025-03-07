import { lazy } from 'react';

export const TanStackRouterDevtools = !import.meta.env.DEV
  ? () => null // Render nothing in production
  : lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );
