import { useLanguage } from "@/lib/i18n/language.provider";
import { WaveformSlashIcon } from "@phosphor-icons/react";

function ProjectsEmptyState() {
  const { t } = useLanguage();

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 py-16 text-center animate-fade animate-duration-300">
      <span className="flex items-center justify-center size-12 rounded-md bg-background border text-muted-foreground">
        <WaveformSlashIcon className="size-6 animate-pulse" />
      </span>
      <div className="flex flex-col gap-1 max-w-sm">
        <span className="text-sm font-semibold text-foreground">
          {t.projects.empty.title}
        </span>
        <p className="text-xs text-muted-foreground">
          {t.projects.empty.description}
        </p>
      </div>
    </div>
  );
}

export default ProjectsEmptyState;
