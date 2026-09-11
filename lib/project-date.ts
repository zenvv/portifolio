import type { Locale } from "./i18n/translations";

const MONTH_ABBR: Record<Locale, readonly string[]> = {
  pt: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

/**
 * Formats a project's `createdAt` (stored as an ISO "YYYY-MM" string) into the
 * "Mês/Ano" label shown on cards and project pages, in the given locale.
 */
export function formatProjectDate(isoMonth: string, locale: Locale): string {
  const [yearStr, monthStr] = isoMonth.split("-");
  const monthIndex = Number(monthStr) - 1;
  const abbr = MONTH_ABBR[locale][monthIndex];
  return `${abbr}/${yearStr}`;
}
