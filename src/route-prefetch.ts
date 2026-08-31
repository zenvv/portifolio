/**
 * Route chunk loaders, shared between the router (which wraps them in
 * `React.lazy`) and `TransitionLink` (which fires them on hover/focus so the
 * chunk is already in memory by the time the user clicks). Keep this module
 * free of component imports — it must stay a leaf so `TransitionLink` can
 * import it without pulling the router graph back in.
 */
export const loadRoute = {
  home: () => import("./pages/home"),
  about: () => import("./pages/about/about"),
  projects: () => import("./pages/projects/projects"),
  project: () => import("./pages/projects/pid/project"),
  notFound: () => import("./pages/not-found"),
};

/** Warm the JS chunk for `to` before the user commits to navigating there. */
export function prefetchRoute(to: string) {
  if (to === "/") void loadRoute.home();
  else if (to === "/about") void loadRoute.about();
  else if (to === "/projects") void loadRoute.projects();
  else if (to.startsWith("/projects/")) void loadRoute.project();
}
