import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import App from "./App";

const HomePage = lazy(() => import("./pages/home"));
const AboutPage = lazy(() => import("./pages/about/about"));
const ProjectsPage = lazy(() => import("./pages/projects/projects"));
const ProjectPage = lazy(() => import("./pages/projects/pid/project"));
const NotFoundPage = lazy(() => import("./pages/not-found"));

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/projects/:slug", element: <ProjectPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
