import { Suspense } from "react";
import { Outlet } from "react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n/language.provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/sidebar/Navbar";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <LanguageProvider>
        <TooltipProvider>
          <div className="min-h-dvh flex flex-col">
            <Navbar />
            <div className="max-w-full lg:max-w-5xl mx-auto min-h-full flex-1 shrink-0 w-full flex flex-col px-4 py-6 sm:px-8 md:p-8">
              <div className="flex md:flex-row flex-col md:gap-8 gap-4 flex-1 min-w-0">
                <Sidebar />
                <div className="flex flex-col flex-1 md:ml-56 w-full min-w-0 [view-transition-name:page-content]">
                  <Suspense fallback={null}>
                    <Outlet />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
