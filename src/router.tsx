import type { ComponentType } from "react";
import { createBrowserRouter } from "react-router";
import App from "./App";
import PageSkeleton from "@/components/PageSkeleton";
import { loadRoute } from "./route-prefetch";

/**
 * Routes use react-router's own `lazy` (not `React.lazy`): the router fetches
 * the page chunk during the navigation's loading phase and only swaps the DOM
 * once it's ready, so the view transition captures a fully-rendered page
 * instead of a blank Suspense fallback. `TransitionLink` prefetches the same
 * chunks on hover/focus, so that loading phase is usually instant.
 */
const page =
  (load: () => Promise<{ default: ComponentType }>) => async () => ({
    Component: (await load()).default,
  });

export const router = createBrowserRouter([
  {
    element: <App />,
    HydrateFallback: PageSkeleton,
    children: [
      { index: true, lazy: page(loadRoute.home) },
      { path: "about", lazy: page(loadRoute.about) },
      { path: "projects", lazy: page(loadRoute.projects) },
      { path: "projects/:slug", lazy: page(loadRoute.project) },
      { path: "*", lazy: page(loadRoute.notFound) },
    ],
  },
]);
