import Hero from "@/components/Hero";
import StackSection from "@/components/home/Stack";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import {
  usePageMeta,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
} from "@/lib/use-page-meta";
import { Scales } from "../components/ui/scales";

export default function HomePage() {
  usePageMeta(DEFAULT_TITLE, DEFAULT_DESCRIPTION);

  return (
    <div className="h-full w-full relative flex flex-col gap-0 flex-1">
      <span className="relative h-10">
        <Scales />
      </span>
      <span className="my-0 flex-1 gap-8 flex flex-col w-full border-y p-6 min-h-full shrink-0">
        <Hero />
        <StackSection />
        <FeaturedProjects />
      </span>
      <span className="relative h-16 border-b">
        <Scales orientation="diagonal" />
      </span>
    </div>
  );
}
