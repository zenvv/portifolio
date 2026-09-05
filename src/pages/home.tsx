import Hero from "@/components/Hero";
import StackSection from "@/components/home/Stack";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import GlassBadge from "@/components/home/GlassBadge";
import {
  usePageMeta,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
} from "@/lib/use-page-meta";
import { Scales } from "../components/ui/scales";
import ContactLinks from "@/components/sidebar/Contact";
import SectionTitle from "@/components/SectionTitle";
import { useLanguage } from "@/lib/i18n/language.provider";

export default function HomePage() {
  usePageMeta(DEFAULT_TITLE, DEFAULT_DESCRIPTION);
  const { t } = useLanguage();

  return (
    <div className="h-full w-full relative flex flex-col gap-0 flex-1 overflow-x-clip">
      <GlassBadge className="absolute -right-42 -top-38 size-160 -rotate-35 dark:opacity-20" />
      <span className="relative z-10 h-10 bg-background">
        <Scales />
      </span>
      <span className="relative z-10 my-0 flex-1 gap-8 flex flex-col w-full p-6 min-h-full shrink-0 border-t bg-linear-to-t from-background dark:via-background to-transparent">
        <Hero />
        <StackSection />
        <FeaturedProjects />
      </span>
      <span className="relative z-10 flex-1 border-b">
        <SectionTitle title={t.contact.heading} align="center" />
        <span className="p-6 w-full flex items-center justify-center pb-8">
          <ContactLinks layout="row" />
        </span>
      </span>
      <span className="relative z-10 h-16 border-b">
        <Scales orientation="diagonal" />
      </span>
    </div>
  );
}
