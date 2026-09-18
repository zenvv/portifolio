import { Navigate } from "react-router";
import { useLanguage } from "@/lib/i18n/language.provider";
import { renderRichText } from "@/lib/i18n/render-rich-text";
import AboutPersonal from "@/components/home/AboutPersonal";
import { EASE, useScrollReveal } from "@/lib/motion";
import { motion } from "motion/react";
import { Smiley } from "@phosphor-icons/react";
import CompanySection from "@/components/home/CompanySection";
import EducationSection from "@/components/home/EducationSection";
import { Companies } from "@/data/experience";
import { EducationList } from "@/data/education";
import { Separator } from "@/components/ui/separator";
/**
 * The About page's content was folded into the home page's "Sobre mim"
 * section (trajectory + personal) to avoid two pages covering the same
 * ground. See the home/about restructure. This route is kept only so
 * existing bookmarks/links to "/about" (and "/en/about") still land
 * somewhere meaningful instead of a dead link.
 */
export function AboutPage() {
  const { locale } = useLanguage();
  const homePath = locale === "en" ? "/en" : "/";
  return <Navigate to={`${homePath}#sobre-mim`} replace />;
}

function AboutSection() {
  const { t, locale } = useLanguage();
  const {
    ref: sobreRef,
    active: sobreActive,
    reduceMotion: sobreReduceMotion,
  } = useScrollReveal<HTMLSpanElement>();
  const { ref: experienceRef } = useScrollReveal<HTMLSpanElement>();

  return (
    <div className="flex sm:flex-row flex-col w-full max-w-5xl items-start justify-center mx-auto gap-8 py-8">
      <div className="flex flex-col w-full sm:w-1/2 shrink-0 sm:p-0 px-6">
        <span
          ref={sobreRef}
          id="sobre-mim"
          className="relative z-10 flex flex-col sm:items-start items-center gap-10 scroll-mt-20 "
        >
          <motion.span
            className="text-xl font-bold font-heading italic text-foreground leading-none mb-1 flex items-center justify-start gap-1"
            initial={sobreReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={sobreActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <Smiley className="size-6 -rotate-16" />
            <span>{t.hero.aboutTitle}</span>
          </motion.span>
        </span>
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-10">
          <p className="text-sm leading-relaxed text-muted-foreground text-center sm:text-start text-pretty">
            {renderRichText(t.about.intro, {
              bold: "font-semibold text-foreground",
            })}
          </p>
          <AboutPersonal />
        </div>
      </div>
      <Separator orientation="vertical" className={"hidden sm:block"} />
      <Separator orientation="horizontal" className={"sm:hidden block"} />
      <span
        ref={experienceRef}
        id="experiencia"
        className="relative z-10 sm:w-1/2 w-full shrink-0 flex flex-col sm:p-0 px-6 gap-6"
      >
        <CompanySection companies={Companies} locale={locale} t={t} />
        <EducationSection education={EducationList} locale={locale} t={t} />
      </span>
    </div>
  );
}

export default AboutSection;
