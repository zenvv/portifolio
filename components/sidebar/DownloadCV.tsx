import { useLanguage } from "@/lib/i18n/language.provider";
import { Button } from "../ui/button";
import { DownloadSimpleIcon, ReadCvLogoIcon } from "@phosphor-icons/react";

function DownloadCV() {
  const { t, locale } = useLanguage();
  const cvHref =
    locale === "pt"
      ? "/cv/Currículo - Willian Ferreira Zeni - PTBR.pdf"
      : "/cv/en.pdf";

  return (
    <Button
      variant="outline"
      render={<a href={cvHref} download />}
      className="h-10 flex justify-start gap-3 px-1 py-0 group bg-linear-to-tr from-muted to-card hover:scale-[102%]  hover:text-background hover:to-foreground hover:from-card-foreground transition-all text-xs"
    >
      <span className="border size-8 p-1 rounded-md bg-linear-to-t from-muted to-transparent flex items-center justify-center group-hover:from-transparent  transition-all group-hover:border-neutral-500/50">
        <ReadCvLogoIcon className="size-5 group-hover:-rotate-25 transition-all" />
      </span>
      <span className="flex-1">{t.nav.cv}</span>
      <DownloadSimpleIcon className="transition-all mr-3 group-hover:mr-2" />
    </Button>
  );
}

export default DownloadCV;
