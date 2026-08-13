import Hero from "@/components/Hero";
import ProjectsBanner from "@/src/pages/projects/components/ProjectBanner";
import StackSection from "@/components/home/Stack";
import SongsBanner from "@/components/home/Songs";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <ProjectsBanner className="animate-fade-down animate-duration-500 animate-delay-550 animate-fill-both" />
      <SongsBanner className="animate-fade-down animate-duration-500 animate-delay-850 animate-fill-both my-8" />
      <StackSection className="animate-fade-down animate-duration-500 animate-delay-700 animate-fill-both" />
    </div>
  );
}
