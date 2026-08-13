import { useLanguage } from "@/lib/i18n/language.provider";
import { Button } from "../ui/button";

import {
  EnvelopeOpenIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  WhatsappLogoIcon,
  type Icon,
} from "@phosphor-icons/react";

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

function Links() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-1.5 min-w-full">
      <span className="text-xs text-muted-foreground">
        {t.contact.heading}
      </span>
      <div className="flex flex-col gap-1">
        {socials.map((social) => {
          return (
            <Button
              key={social.id}
              variant="ghost"
              size={"sm"}
              className={
                "hover:bg-linear-to-tl from-foreground/80 to-foreground border hover:border-border border-transparent hover:text-background justify-start p-0! h-auto m-0! group flex w-full"
              }
            >
              <a
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="flex aspect-auto gap-2 items-center justify-start p-0 h-9 text-xs w-full group-hover:pl-1 group-hover:pr-0! transition-[padding]"
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

export default Links;
