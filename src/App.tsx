import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n/language.provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/sidebar/Navbar";
import Footer from "@/components/Footer";
import { prefetchRoute } from "@/src/route-prefetch";

export default function App() {
  // Once the landing page is interactive and the browser is idle, warm the
  // chunk for the route a first-time visitor is most likely to open next.
  useEffect(() => {
    if (typeof requestIdleCallback !== "function") return;
    const id = requestIdleCallback(
      () => {
        prefetchRoute("/projects");
      },
      { timeout: 3000 },
    );
    return () => cancelIdleCallback(id);
  }, []);

  // Scrolls to a "#section" target after navigating there, e.g. the header's
  // "Contact" nav link pointing at "/#contato" from another page: the
  // target route's chunk may still be loading when this runs, so poll
  // briefly instead of assuming the element already exists.
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    let cancelled = false;
    let elapsed = 0;
    const step = 100;
    const timeoutMs = 3000;

    function tryScroll() {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      elapsed += step;
      if (elapsed < timeoutMs) setTimeout(tryScroll, step);
    }
    tryScroll();

    return () => {
      cancelled = true;
    };
  }, [pathname, hash]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LanguageProvider>
        <TooltipProvider>
          <div className="min-h-dvh flex flex-col ">
            <div className="max-w-full mx-auto min-h-full flex-1 shrink-0 w-full flex flex-col z-50 relative">
              <Navbar />
              <div
                className="flex flex-col flex-1 mx-auto w-full max-w-7xl min-w-0"
                style={{ viewTransitionName: "page-content" }}
              >
                <Suspense fallback={null}>
                  <Outlet />
                </Suspense>
              </div>
              <Footer />
            </div>
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
