import { motion } from "motion/react";
import { EASE, useScrollReveal } from "@/lib/motion";
import Hero from "@/components/Hero";
import StackSection from "@/components/home/Stack";
import ImpactStats from "@/components/home/ImpactStats";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import CTA from "@/components/home/CTA";
import CompanySection from "@/components/home/CompanySection";
import EducationSection from "@/components/home/EducationSection";
import AboutPersonal from "@/components/home/AboutPersonal";
import {
  usePageMeta,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
} from "@/lib/use-page-meta";
import { ContactGrid } from "@/components/sidebar/Contact";
import { useLanguage } from "@/lib/i18n/language.provider";
import { renderRichText } from "@/lib/i18n/render-rich-text";
import { Companies } from "@/data/experience";
import { EducationList } from "@/data/education";
import RulerTicks from "@/components/RulerTicks";
import { Smiley } from "@phosphor-icons/react";

export default function HomePage() {
  const { t, locale } = useLanguage();
  usePageMeta(DEFAULT_TITLE[locale], DEFAULT_DESCRIPTION[locale]);
  const contact = useScrollReveal<HTMLSpanElement>();
  const sobre = useScrollReveal<HTMLSpanElement>();

  return (
    <div className="h-full w-full relative flex flex-col gap-0 flex-1 overflow-x-clip">
      <span className="relative z-10 my-0 flex-1 gap-14 flex flex-col w-full p-6 pt-0 min-h-full shrink-0 bg-linear-to-t from-background dark:via-background to-transparent">
        <div className="relative z-10 flex flex-col gap-0 w-full">
          <RulerTicks delay={0.4} className="-mx-6 mb-5 w-[calc(100%+3rem)]" />
          <Hero />
          <RulerTicks delay={0.4} className="-mx-6 w-[calc(100%+3rem)]" />
        </div>
        <FeaturedProjects />
        <ImpactStats />
        <StackSection />
      </span>

      <RulerTicks delay={0.4} className="-mx-6 mt-2 w-[calc(100%+3rem)]" />
      <span
        ref={contact.ref}
        id="contato"
        className="relative z-10 px-6 py-12 scroll-mt-20"
      >
        <div className="mx-auto flex w-full max-w-2xl flex-col items-start gap-0">
          <motion.span
            className="text-xl font-bold font-heading italic text-foreground leading-none mb-1"
            initial={contact.reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={contact.active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {t.contact.heading}
          </motion.span>
          <motion.p
            className="max-w-md text-center text-sm text-muted-foreground leading-none mb-4"
            initial={contact.reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={contact.active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, delay: 0.08, ease: EASE }}
          >
            {t.contact.subheading}
          </motion.p>
          <ContactGrid className="mt-2 w-full" />
        </div>
      </span>
      <RulerTicks delay={0.4} className="-mx-6 mt-2 w-[calc(100%+3rem)]" />
      <span
        ref={sobre.ref}
        id="sobre-mim"
        className="relative z-10 flex flex-col gap-10 px-6 py-12 scroll-mt-20"
      >
        <motion.span
          className="text-xl font-bold font-heading italic text-foreground leading-none mb-1 flex items-center justify-start gap-1"
          initial={sobre.reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={sobre.active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <Smiley className="size-6 -rotate-16" />
          <span>{t.hero.aboutTitle}</span>
        </motion.span>

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
          <div className="flex flex-col gap-10">
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              {renderRichText(t.about.intro, {
                bold: "font-semibold text-foreground",
              })}
            </p>
            <AboutPersonal />
          </div>
          <div className="flex flex-col gap-10">
            <CompanySection companies={Companies} locale={locale} t={t} />
            <EducationSection education={EducationList} locale={locale} t={t} />
          </div>
        </div>
      </span>
      <RulerTicks delay={0.4} className="-mx-6 my-10 w-[calc(100%+3rem)]" />
      <CTA />
      <span className="mb-20"></span>
    </div>
  );
}
