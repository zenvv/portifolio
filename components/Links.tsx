import { useLanguage } from "@/lib/i18n/language.provider";
import { Button, buttonVariants } from "./ui/button";

import {
  ArrowUpRightIcon,
  EnvelopeOpenIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  MailboxIcon,
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
    <span className="gap-1 flex flex-col md:mt-4 min-w-full flex-1">
      <span className="text-xs text-muted-foreground md:text-left text-center md:block hidden">
        {t.contact.heading}
      </span>
      <span className="md:items-start md:justify-start gap-1 md:flex-col flex flex-1 justify-center">
        {socials.map((social) => {
          return (
            <Button
              key={social.id}
              variant="ghost"
              size={"sm"}
              className={
                "hover:bg-linear-to-tl from-foreground/80 to-foreground border hover:border-border border-transparent hover:text-background justify-start p-0! h-auto! group flex md:w-full"
              }
            >
              <a
                href={social.link}
                target="_blank"
                className="flex gap-2 items-center justify-start p-0 h-8 text-xs w-full md:group-hover:pl-1 md:group-hover:pr-0! px-2! transition-[padding]"
              >
                <span className="bg-muted flex items-center justify-center rounded-sm border group-hover:bg-transparent group-hover:border-transparent  text-foreground group-hover:text-background size-6!  aspect-square">
                  <social.icon
                    weight="fill"
                    className="hidden group-hover:block"
                  />
                  <social.icon
                    weight="regular"
                    className="block group-hover:hidden"
                  />
                </span>
                <span className="truncate md:block hidden">{social.label}</span>
              </a>
            </Button>
          );
        })}
      </span>
    </span>
  );
}

export default Links;
