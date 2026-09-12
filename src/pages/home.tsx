import Hero from "@/components/Hero";
import Capabilities from "@/components/home/Capabilities";
import StackSection from "@/components/home/Stack";
import ImpactStats from "@/components/home/ImpactStats";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import CTA from "@/components/home/CTA";
import GlassBadge from "@/components/home/GlassBadge";
import CompanySection from "@/components/home/CompanySection";
import EducationSection from "@/components/home/EducationSection";
import PhotoMasonry from "@/components/home/PhotoMasonry";
import SongsBanner from "@/components/home/Songs";
import {
  usePageMeta,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
} from "@/lib/use-page-meta";
import { Scales } from "../components/ui/scales";
import ContactLinks from "@/components/sidebar/Contact";
import SectionTitle from "@/components/SectionTitle";
import { useLanguage } from "@/lib/i18n/language.provider";
import { renderRichText } from "@/lib/i18n/render-rich-text";
import { Companies } from "@/data/experience";
import { EducationList } from "@/data/education";
import { PROFILE_PHOTOS } from "@/data/photos";

export default function HomePage() {
  const { t, locale } = useLanguage();
  usePageMeta(DEFAULT_TITLE[locale], DEFAULT_DESCRIPTION[locale]);

  return (
    <div className="h-full w-full relative flex flex-col gap-0 flex-1 overflow-x-clip">
      <GlassBadge className="absolute -right-42 -top-38 size-160 -rotate-35 dark:opacity-20" />
      <span className="relative z-10 h-10 bg-background">
        <Scales />
      </span>
      <span className="relative z-10 my-0 flex-1 gap-8 flex flex-col w-full p-6 min-h-full shrink-0 border-t bg-linear-to-t from-background dark:via-background to-transparent">
        <Hero />
        <Capabilities />
        <StackSection />
        <ImpactStats />
        <FeaturedProjects />
        <CTA />
      </span>

      <span id="contato" className="relative z-10 flex-1 border-y scroll-mt-20">
        <SectionTitle title={t.contact.heading} align="center" />
        <span className="p-6 w-full flex items-center justify-center pb-8">
          <ContactLinks layout="row" />
        </span>
      </span>

      <span
        id="sobre-mim"
        className="relative z-10 flex flex-col gap-2 p-0 scroll-mt-20"
      >
        <div className="pt-2">
          <SectionTitle align="center" title={t.hero.aboutTitle} />
        </div>
        <div className="p-6 flex items-center justify-center flex-col gap-6">
          <p className="text-sm text-muted-foreground tracking-tight max-w-2xl text-justify">
            {renderRichText(t.about.intro, {
              bold: "font-bold text-foreground",
            })}
          </p>
        </div>

        <CompanySection companies={Companies} locale={locale} t={t} />
        <EducationSection education={EducationList} locale={locale} t={t} />

        <div className="border-t pt-2">
          <SectionTitle
            align="center"
            title={t.about.personalTitle}
            titleLevel="h3"
          />
          <p className="text-sm text-muted-foreground tracking-tight text-justify p-6">
            {t.about.personalBlurb}
          </p>
        </div>

        <PhotoMasonry photos={PROFILE_PHOTOS} t={t} />

        <SongsBanner />
      </span>

      <span className="relative z-10 h-16 border-y">
        <Scales orientation="diagonal" />
      </span>
    </div>
  );
}
