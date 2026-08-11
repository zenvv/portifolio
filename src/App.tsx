import Hero from "@/components/Hero";
import Images from "@/components/Images";
import Links from "@/components/Links";
import ProjectList from "@/components/projects/ProjectList";
import { Button } from "@/components/ui/button";
import { loadProjectDetails } from "@/lib/project-content";

function App() {
  const projectDetails = loadProjectDetails();

  return (
    <div className="min-h-screen flex overflow-hidden">
      <div className="max-w-4xl mx-auto min-h-full flex-1 shrink-0 w-full flex flex-col p-8 overflow-hidden">
        <div className="flex md:flex-row flex-col md:gap-8 gap-4 ">
          <span className="md:w-48 flex flex-col items-start justify-start md:fixed">
            <Images className="md:flex hidden" />
            <Links />
          </span>
          <div className="flex flex-col flex-1 md:ml-56">
            <Hero />
            <ProjectList type="dev" projectDetails={projectDetails} />
            <ProjectList type="design" projectDetails={projectDetails} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
