import Hero from "@/components/Hero";
import ProjectsBanner from "@/src/pages/projects/components/ProjectBanner";
import { loadProjectDetails } from "@/lib/project-content";
import SongsBanner from "@/components/home/Songs";

export default function HomePage() {
  const projectDetails = loadProjectDetails();

  return (
    <div className="animate-fade-right">
      <Hero />
      <ProjectsBanner />
      <SongsBanner />
    </div>
  );
}
