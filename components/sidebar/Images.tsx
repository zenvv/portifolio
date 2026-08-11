import { useLanguage } from "@/lib/i18n/language.provider";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";

function Images({ className, mini }: { className?: string; mini?: boolean }) {
  const { t } = useLanguage();

  return (
    <>
      {mini ? (
        <img
          src="/images/me_1.png"
          alt="me"
          className="object-cover opacity-100 transition-all aspect-square border rounded-lg size-full"
        />
      ) : (
        <Tooltip>
          <TooltipTrigger className={cn("flex mb-8 group", className)}>
            <span className="size-48 relative border rounded-lg overflow-hidden">
              <img
                src="/images/me_1.png"
                alt="me at my 22nd birthday"
                className=" object-cover opacity-100 transition-all absolute size-48 group-hover:scale-110 z-0"
              />
              <img
                src="/images/me_2.png"
                alt="me at my 22nd birthday"
                className="object-cover group-hover:opacity-100 opacity-0 transition-all absolute size-48 group-hover:scale-110 z-2"
              />
            </span>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="center" sideOffset={-10}>
            {t.easterEgg}
          </TooltipContent>
        </Tooltip>
      )}
    </>
  );
}

export default Images;
