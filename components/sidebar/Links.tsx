import { useLanguage } from "@/lib/i18n/language.provider";
import type { Locale } from "@/lib/i18n/translations";
import TransitionLink from "../TransitionLink";
import { useLocation } from "react-router";
import { cn } from "@/lib/utils";

interface linksTypes {
  id: number;
  label: Record<Locale, string>;
  to: string;
}

const linksList: linksTypes[] = [
  {
    id: 0,
    label: {
      en: "Home",
      pt: "Início",
    },
    to: "/",
  },
  {
    id: 1,
    label: {
      en: "Projects",
      pt: "Projetos",
    },
    to: "/projects",
  },
  {
    id: 2,
    label: {
      en: "About",
      pt: "Sobre",
    },
    to: "/about",
  },
];

function Links() {
  const { locale } = useLanguage();
  const location = useLocation();

  return (
    <span className="hidden items-center justify-center gap-2 md:flex">
      {linksList.map((link) => (
        <TransitionLink
          key={link.id}
          to={link.to}
          direction="forward"
          className={cn(
            location.pathname == link.to
              ? "text-amber-600 dark:text-amber-400"
              : "",
          )}
        >
          <span>{link.label[locale]}</span>
        </TransitionLink>
      ))}
    </span>
  );
}

export default Links;
