import type { Locale, Translations } from "@/lib/i18n/translations";
import SectionTitle from "@/components/SectionTitle";
import { LightbulbIcon } from "@phosphor-icons/react";

/** A highlighted callout, set apart from the rest of the page's tone: this
 * is hindsight, not a pitch, so it gets its own visual weight instead of
 * blending into the surrounding prose. */
export default function WhatIdDoDifferently({
  paragraphs,
  locale,
  t,
}: {
  paragraphs: Record<Locale, string[]>;
  locale: Locale;
  t: Translations;
}) {
  const text = paragraphs[locale];
  if (!text || text.length === 0) return null;

  return (
    <div className="flex w-full max-w-5xl flex-col gap-4">
      <div className="flex flex-col gap-3 border-l-6 border-primary/40 bg-muted/30 px-5 py-4">
        <SectionTitle
          align="start"
          title={t.projects.whatIdDoDifferentlyTitle}
          icon={<LightbulbIcon />}
          titleLevel="h3"
        />
        {text.map((paragraph) => (
          <p
            key={paragraph}
            className="text-sm leading-relaxed text-muted-foreground"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
