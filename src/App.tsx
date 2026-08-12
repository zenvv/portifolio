import { Route, Routes } from "react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n/language.provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from "@/components/sidebar/Sidebar";
import HomePage from "./pages/home";
import ProjectsPage from "./pages/projects/projects";
import ProjectPage from "./pages/projects/pid/project";
import NotFoundPage from "./pages/not-found";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <LanguageProvider>
        <TooltipProvider>
          <div className="min-h-screen flex overflow-hidden">
            <div className="max-w-full lg:max-w-5xl mx-auto min-h-full flex-1 shrink-0 w-full flex flex-col p-8 overflow-hidden">
              <div className="flex md:flex-row flex-col md:gap-8 gap-4 flex-1 min-w-0">
                <Sidebar />
                <div className="flex flex-col flex-1 md:ml-56 w-full min-w-0">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/projects/:slug" element={<ProjectPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
