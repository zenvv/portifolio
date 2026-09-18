import { motion } from "motion/react";
import { EASE, useScrollReveal } from "@/lib/motion";
import Hero from "@/components/Hero";
import StackSection from "@/components/home/Stack";
import ImpactStats from "@/components/home/ImpactStats";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import OtherProjectsList from "@/components/home/OtherProjectsList";
import CTA from "@/components/home/CTA";

import {
  usePageMeta,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
} from "@/lib/use-page-meta";
import { ContactGrid } from "@/components/sidebar/Contact";
import { useLanguage } from "@/lib/i18n/language.provider";

import RulerTicks from "@/components/RulerTicks";
import AboutSection from "./about/about";

export default function HomePage() {
  const { t, locale } = useLanguage();
  usePageMeta(DEFAULT_TITLE[locale], DEFAULT_DESCRIPTION[locale]);

  const {
    ref: contactRef,
    active: contactActive,
    reduceMotion: contactReduceMotion,
  } = useScrollReveal<HTMLSpanElement>();

  return (
    <div className="h-full w-full relative flex flex-col gap-0 flex-1 overflow-x-clip">
      <span className="relative z-10 my-0 flex-1 gap-0 flex flex-col w-full p-0 pt-0 min-h-full shrink-0 bg-linear-to-t from-background dark:via-background to-transparent">
        <div className="relative z-10 flex flex-col gap-0 w-full">
          <RulerTicks delay={0.4} className="-mx-6 mb-0 w-[calc(100%+3rem)]" />
          <Hero />
          <RulerTicks delay={0.4} className="-mx-6 mb-0 w-[calc(100%+3rem)]" />
        </div>
        <ImpactStats />
        <FeaturedProjects />
        <OtherProjectsList />
        <StackSection />
      </span>

      <RulerTicks delay={0.4} className="-mx-6 mt-2 w-[calc(100%+3rem)]" />

      <AboutSection />

      <RulerTicks delay={0.4} className="-mx-6 mt-2 w-[calc(100%+3rem)]" />
      <span
        ref={contactRef}
        id="contato"
        className="relative z-10 px-6 py-12 scroll-mt-20"
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-0">
          <motion.span
            className="text-2xl font-bold font-heading italic text-foreground leading-none mb-3"
            initial={contactReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={contactActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {t.contact.heading}
          </motion.span>
          <motion.p
            className="max-w-md text-center text-sm text-muted-foreground leading-none mb-4"
            initial={contactReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={contactActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, delay: 0.08, ease: EASE }}
          >
            {t.contact.subheading}
          </motion.p>
          <ContactGrid className="mt-2 w-full mx-auto sm:flex-row flex-col" />
        </div>
      </span>
      <RulerTicks delay={0.4} className="-mx-6 my-10 w-[calc(100%+3rem)]" />
      <CTA />
      <span className="mb-20"></span>
    </div>
  );
}
