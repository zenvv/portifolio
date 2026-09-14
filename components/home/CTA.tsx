import { ArrowRightIcon } from "@phosphor-icons/react";
import TransitionLink from "@/components/TransitionLink";
import DownloadCV from "@/components/sidebar/DownloadCV";
import { useLanguage } from "@/lib/i18n/language.provider";
import { cn } from "@/lib/utils";

export default function CTA({ className }: { className?: string }) {
  const { t } = useLanguage();

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 w-full py-2",
        className,
      )}
    >
      <TransitionLink
        to="/projects"
        direction="forward"
        variant="default"
        size="lg"
        className="gap-1.5"
      >
        {t.cta.viewAllProjects}
        <ArrowRightIcon className="size-3.5" />
      </TransitionLink>
      <DownloadCV />
    </div>
  );
}
