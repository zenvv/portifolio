import { useLocation, useNavigate } from "react-router";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import Flag from "react-world-flags";
import { useLanguage } from "@/lib/i18n/language.provider";
import { localizePath } from "@/lib/i18n/paths";

function LangSelector() {
  const { locale, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <ToggleGroup
      value={[locale === "pt" ? "PT" : "EN"]}
      onValueChange={(value) => {
        const next = value[0] as "EN" | "PT" | undefined;
        if (!next) return;
        const targetLocale = next === "PT" ? "pt" : "en";
        navigate(
          localizePath(location.pathname, targetLocale) +
            location.search +
            location.hash,
          { viewTransition: true },
        );
      }}
      aria-label={t.nav.languageSelection}
      spacing={0.1}
      size={"sm"}
      className="divide-x"
    >
      <ToggleGroupItem
        value="PT"
        aria-label="Português"
        className="aspect-square saturate-0! transition-all data-pressed:saturate-100! data-pressed:bg-transparent   border-transparent  group p-0"
      >
        <Flag
          code={"br"}
          className="size-5 group-hover:scale-110 group-active:scale-90 transition-transform"
        />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="EN"
        aria-label="English"
        className="aspect-square saturate-0! transition-all data-pressed:saturate-100! data-pressed:bg-transparent  border-transparent  group p-0"
      >
        <Flag
          code={"gb"}
          className="size-5 group-hover:scale-110 group-active:scale-90  transition-transform "
        />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export default LangSelector;
