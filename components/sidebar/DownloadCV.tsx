import { useLanguage } from "@/lib/i18n/language.provider";
import { Button } from "../ui/button";
import { DownloadSimpleIcon, ReadCvLogoIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

function DownloadCV({ className }: { className?: string }) {
  const { t, locale } = useLanguage();
  const cvHref =
    locale === "pt"
      ? "/cv/Currículo - Willian Ferreira Zeni - PTBR.pdf"
      : "/cv/en.pdf";

  return (
    <Button
      variant="outline"
      size="lg"
      render={<a href={cvHref} download />}
      className={cn("gap-2", className)}
    >
      <ReadCvLogoIcon className="size-4" />
      {t.nav.cv}
      <DownloadSimpleIcon className="size-4" />
    </Button>
  );
}

export default DownloadCV;
