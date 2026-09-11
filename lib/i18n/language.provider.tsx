import * as React from "react";
import { useLocation } from "react-router";
import { translations, type Locale } from "./translations";
import { localeFromPath } from "./paths";

type LanguageContextValue = {
  locale: Locale;
  t: (typeof translations)[Locale];
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

/** The site's locale is a pure function of the URL ("/en/..." vs
 * everything else) so that what a crawler fetches for a given path always
 * matches what a visitor sees — see lib/i18n/paths.ts. */
function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);

  React.useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "pt-BR";
  }, [locale]);

  const value = React.useMemo(
    () => ({ locale, t: translations[locale] }),
    [locale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export { LanguageProvider, useLanguage };
