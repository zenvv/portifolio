import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

import {
  EnvelopeOpenIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  WhatsappLogoIcon,
  type Icon,
} from "@phosphor-icons/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface SocialsType {
  id: number;
  label: string;
  icon: Icon;
  link: string;
}

const socials: SocialsType[] = [
  {
    id: 0,
    label: "Github",
    icon: GithubLogoIcon,
    link: "https://www.github.com/zenvv",
  },
  {
    id: 1,
    label: "LinkedIn",
    icon: LinkedinLogoIcon,
    link: "https://www.linkedin.com/in/willian-z-327bba186/",
  },
  {
    id: 2,
    label: "willianf.zeni@gmail.com",
    icon: EnvelopeOpenIcon,
    link: "mailto:willianf.zeni@gmail.com",
  },
  {
    id: 3,
    label: "(54) 99158-0442",
    icon: WhatsappLogoIcon,
    link: "tel:54991580442",
  },
];

function ContactLinks({
  layout = "column",
  className,
}: {
  /** "row" lays each link out side by side instead of stacked full-width. */
  layout?: "column" | "row";
  className?: string;
}) {
  const isRow = layout === "row";

  return (
    <div
      className={cn("flex flex-col gap-1.5", !isRow && "min-w-full", className)}
    >
      <div
        className={cn("flex gap-1", isRow ? "flex-row flex-wrap" : "flex-col")}
      >
        {socials.map((social) => {
          return (
            <Button
              key={social.id}
              variant="ghost"
              size={"sm"}
              className={cn(
                "hover:bg-linear-to-tl from-foreground/80 to-foreground border hover:border-border border-transparent hover:text-background justify-start p-0! h-auto m-0! group flex",
                isRow ? "w-auto" : "w-full",
              )}
            >
              <a
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "flex aspect-auto gap-2 items-center justify-start p-0 h-9 text-xs transition-[padding]",
                  isRow
                    ? "w-auto pr-3 group-hover:pl-1"
                    : "w-full group-hover:pl-1 group-hover:pr-0!",
                )}
              >
                <span className="bg-muted flex items-center justify-center rounded-sm border group-hover:bg-transparent group-hover:border-transparent text-foreground group-hover:text-background size-6! shrink-0 aspect-square">
                  <social.icon
                    weight="fill"
                    className="hidden group-hover:block"
                  />
                  <social.icon
                    weight="regular"
                    className="block group-hover:hidden"
                  />
                </span>
                <span className="truncate">{social.label}</span>
              </a>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default ContactLinks;

export function CompactContactLinks() {
  return (
    <div className="flex items-center gap-2">
      {socials.map((social) => {
        return (
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  key={social.id}
                  variant="ghost"
                  size={"icon"}
                  className={
                    "hover:bg-linear-to-tl from-foreground/80 to-foreground border hover:border-border border-transparent hover:text-background size-8 flex items-center justify-center group"
                  }
                  render={
                    <a href={social.link} target="_blank" rel="noreferrer"></a>
                  }
                >
                  <social.icon
                    weight="fill"
                    className="hidden group-hover:block"
                  />
                  <social.icon
                    weight="regular"
                    className="block group-hover:hidden"
                  />
                </Button>
              }
            />

            <TooltipContent>{social.label}</TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
