import { useLanguage } from "@/lib/i18n/language.provider";
import type { Locale } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

type Stat = {
  value: string;
  label: Record<Locale, string>;
};

// Numbers already written on the corresponding project pages (nfs-transporte's
// shortDescription and erp-bello-aramados's scope line) — not new claims.
const STATS: Stat[] = [
  {
    value: "6h → 15–30min",
    label: {
      pt: "ciclo de notas fiscais e declarações de transporte, automatizado",
      en: "invoice and transport declaration cycle, automated",
    },
  },
  {
    value: "18 telas · 5 automações",
    label: {
      pt: "geradas por configuração e portadas num ERP com 6 áreas e 7 sites SharePoint",
      en: "config-generated and ported in an ERP spanning 6 areas and 7 SharePoint sites",
    },
  },
];

export default function ImpactStats({ className }: { className?: string }) {
  const { locale, t } = useLanguage();

  return (
    <div className={cn("flex flex-col gap-3 w-full", className)}>
      <p className="uppercase text-[0.65rem] tracking-wide text-muted-foreground/60 font-medium">
        {t.hero.impact.title}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {STATS.map((stat) => (
          <div
            key={stat.value}
            className="flex flex-col gap-1 border-l-2 border-amber-400/60 pl-3"
          >
            <span className="font-heading text-xl sm:text-2xl font-semibold text-amber-400 leading-tight">
              {stat.value}
            </span>
            <span className="text-xs text-muted-foreground leading-snug">
              {stat.label[locale]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
