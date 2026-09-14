import { Navigate } from "react-router";
import { useLanguage } from "@/lib/i18n/language.provider";

/**
 * The About page's content was folded into the home page's "Sobre mim"
 * section (trajectory + personal) to avoid two pages covering the same
 * ground. See the home/about restructure. This route is kept only so
 * existing bookmarks/links to "/about" (and "/en/about") still land
 * somewhere meaningful instead of a dead link.
 */
export default function AboutPage() {
  const { locale } = useLanguage();
  const homePath = locale === "en" ? "/en" : "/";
  return <Navigate to={`${homePath}#sobre-mim`} replace />;
}
