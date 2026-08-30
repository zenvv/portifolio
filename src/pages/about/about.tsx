import { useLanguage } from "@/lib/i18n/language.provider";
import { renderRichText } from "@/lib/i18n/render-rich-text";
import { ArrowLeftIcon } from "@phosphor-icons/react";

import TransitionLink from "@/components/TransitionLink";
import SongsBanner from "@/components/about/Songs";
import ContactLinks from "@/components/sidebar/Contact";
import CompanySection from "./components/CompanySection";
import EducationSection from "./components/EducationSection";
import PhotoMasonry from "./components/PhotoMasonry";
import SectionTitle from "@/components/SectionTitle";
import { Companies } from "@/data/experience";
import { EducationList } from "@/data/education";
import { PROFILE_PHOTOS } from "@/data/photos";
import { usePageMeta } from "@/lib/use-page-meta";
import { Scales } from "@/src/components/ui/scales";
import DownloadCV from "@/components/sidebar/DownloadCV";

export default function AboutPage() {
  const { locale, t } = useLanguage();

  usePageMeta(
    "zenvv / sobre",
    locale === "pt"
      ? "Sobre Willian Zeni (zenvv): experiência, educação e um pouco mais."
      : "About Willian Zeni (zenvv): experience, education and a bit more.",
  );

  return (
    <div className="flex-1 flex flex-col">
      <span className="flex w-full items-start flex-col justify-between mb-0 gap-4">
        <div className="p-2 border-b w-full flex justify-between items-center gap-4">
          <TransitionLink
            to="/"
            direction="backward"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit"
          >
            <ArrowLeftIcon className="size-3.5" />
            {t.about.backToHome}
          </TransitionLink>

          <DownloadCV className="bg-foreground! hover:bg-foreground/80! text-background!" />
        </div>
      </span>

      <span className="h-8 relative border-b mb-4">
        <Scales />
      </span>

      <div className="max-w-full flex-1 flex flex-col p-0 gap-2">
        <div className="">
          <SectionTitle align="center" title={t.contact.heading} />
          <span className="p-4 w-full flex items-center justify-center ">
            <ContactLinks layout="row" />
          </span>
        </div>
        <div className="">
          <SectionTitle align="center" title={t.hero.aboutTitle} />
          <span className="p-6 w-full flex items-center justify-center flex-col gap-6">
            <p className="text-sm text-muted-foreground tracking-tight text-justify">
              {renderRichText(t.about.intro, {
                bold: "font-bold text-foreground",
              })}
            </p>
          </span>
        </div>

        <CompanySection companies={Companies} locale={locale} t={t} />

        <EducationSection education={EducationList} locale={locale} t={t} />

        <div className="">
          <SectionTitle align="center" title={t.about.personalTitle} />
          <p className="text-sm text-muted-foreground tracking-tight text-justify p-6">
            {t.about.personalBlurb}
          </p>
        </div>

        <PhotoMasonry photos={PROFILE_PHOTOS} t={t} />

        <SongsBanner />
      </div>

      <span className="h-12 relative border-y ">
        <Scales />
      </span>
    </div>
  );
}
