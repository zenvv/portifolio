import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { LanguageProvider } from "@/lib/i18n/language.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </LanguageProvider>
  </StrictMode>,
);
