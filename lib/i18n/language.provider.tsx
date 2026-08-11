import * as React from "react";
import { locales, translations, type Locale } from "./translations";

const STORAGE_KEY = "zeni-locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof translations)[Locale];
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return !!value && (locales as string[]).includes(value);
}

function detectLocale(): Locale {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(stored)) return stored;
  return window.navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
}

// module-level store so useSyncExternalStore can read localStorage without
// setState-in-effect: the server snapshot always resolves to "en" and the
// client re-renders once after hydration with the detected/stored locale
let cachedLocale: Locale | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): Locale {
  if (cachedLocale === null) {
    cachedLocale = detectLocale();
  }
  return cachedLocale;
}

function getServerSnapshot(): Locale {
  return "en";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function commitLocale(next: Locale) {
  cachedLocale = next;
  window.localStorage.setItem(STORAGE_KEY, next);
  listeners.forEach((listener) => listener());
}

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  React.useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = React.useCallback((next: Locale) => {
    commitLocale(next);
  }, []);

  const value = React.useMemo(
    () => ({ locale, setLocale, t: translations[locale] }),
    [locale, setLocale],
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
