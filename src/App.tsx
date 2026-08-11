import Hero from "@/components/Hero";

import ProjectList from "@/components/projects/ProjectList";
import { Button } from "@/components/ui/button";
import { loadProjectDetails } from "@/lib/project-content";
import Sidebar from "../components/sidebar/Sidebar";

function App() {
  const projectDetails = loadProjectDetails();

  return (
    <div className="min-h-screen flex overflow-hidden">
      <div className="max-w-5xl mx-auto min-h-full flex-1 shrink-0 w-full flex flex-col p-8 overflow-hidden">
        <div className="flex md:flex-row flex-col md:gap-8 gap-4 flex-1">
          <Sidebar />
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
