import { useLanguage } from "@/lib/i18n/language.provider";
import { OPEN_TO_WORK } from "@/data/experience";
import { cn } from "@/lib/utils";

/** Compact "open to work" pill: a pulsing dot plus the label, no
 * description. Used in the Hero for immediate visibility, alongside the
 * fuller {@link CompanySection} card that adds the description. Both read
 * from the same {@link OPEN_TO_WORK} flag, so toggling it hides both. */
export default function OpenToWorkBadge({ className }: { className?: string }) {
  const { t } = useLanguage();

  if (!OPEN_TO_WORK) return null;

  return (
    <a
      href="#contact"
      className={cn(
        "inline-flex items-center gap-2 border bg-primary/10 border-primary px-3 py-1 text-xs rounded-full font-medium text-foreground hover:bg-primary hover:text-foreground group",
        className,
      )}
    >
      <span className="relative flex size-2 shrink-0">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75 group-hover:opacity-0" />
        <span className="relative inline-flex size-2 rounded-full bg-primary opacity-75 group-hover:bg-foreground group-hover:opacity-100" />
      </span>
      {t.about.openToWorkTitle}
    </a>
  );
}
