import { Suspense } from "react";
import { Outlet } from "react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n/language.provider";
import { TooltipProvider } from "@/components/ui/tooltip";
// import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/sidebar/Navbar";
export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LanguageProvider>
        <TooltipProvider>
          <div className="min-h-dvh flex flex-col ">
            <div className="max-w-full border-x lg:max-w-5xl mx-auto min-h-full flex-1 shrink-0 w-full flex flex-col z-50 relative bg-background">
              <Navbar />
              <div className="flex md:flex-row flex-col md:gap-8 flex-1 min-w-0">
                <Suspense fallback={null}>
                  <Outlet />
                </Suspense>
              </div>
            </div>
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
