import { motion } from "motion/react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/language.provider";
import { EASE, useScrollReveal } from "@/lib/motion";

import {
  ArrowUpRightIcon,
  EnvelopeOpenIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  WhatsappLogoIcon,
  type Icon,
} from "@phosphor-icons/react";
import { Contact } from "@/data/contact";

export interface SocialsType {
  id: number;
  label: string;
  icon: Icon;
  link: string;
  /** Translation key into `t.contact.captions` for the short caption shown
   * next to the label in the homepage contact grid. */
  captionKey?: "github" | "linkedin" | "whatsapp";
  /** Plain (non-translated) caption, for values like an email address that
   * don't change by locale. Takes precedence over `captionKey`. */
  caption?: string;
}

export const socials: SocialsType[] = [
  {
    id: 0,
    label: "Github",
    icon: GithubLogoIcon,
    link: Contact.github,
    captionKey: "github",
  },
  {
    id: 1,
    label: "LinkedIn",
    icon: LinkedinLogoIcon,
    link: Contact.linkedin,
    captionKey: "linkedin",
  },
  {
    id: 2,
    label: "Email",
    icon: EnvelopeOpenIcon,
    link: `mailto:${Contact.email}`,
    caption: Contact.email,
  },
  {
    id: 3,
    label: "WhatsApp",
    icon: WhatsappLogoIcon,
    link: Contact.whatsapp,
    captionKey: "whatsapp",
  },
];

/** Icon-only contact links, shared by `Navbar` and `Footer` so both surfaces
 * render the exact same tile (size, hover fill, icon weight swap) instead of
 * two independently-styled copies. */
export function SocialIconLinks({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-1.5", className)}>
      {socials.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.id}
            href={social.link}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            title={social.label}
            className="group flex size-9 items-center justify-center text-muted-foreground transition-all hover:bg-primary hover:text-black"
          >
            <Icon weight="regular" className="size-4 group-hover:hidden" />
            <Icon weight="fill" className="hidden size-5 group-hover:block" />
          </a>
        );
      })}
    </span>
  );
}

const ROW_STAGGER = 0.1;
const CONTENT_DELAY_OFFSET = 0.15;
const CONTENT_DURATION = 0.3;

/** The homepage's contact block: each channel as a full-width row (icon,
 * label plus a short caption, an outbound arrow), divided by hairlines
 * instead of individually boxed cards, matching the site's register. Each
 * row's hairline wipes in first, then its content fades up, staggered top
 * to bottom as the block scrolls into view. */
export function ContactGrid({ className }: { className?: string }) {
  const { t } = useLanguage();
  const { ref, active, reduceMotion } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn("grid grid-cols-1  sm:grid-cols-2 sm:gap-1", className)}
    >
      {socials.map((social, i) => {
        const delay = i * ROW_STAGGER;
        return (
          <a
            key={social.id}
            href={social.link}
            target="_blank"
            rel="noreferrer"
            className="group relative block p-5 text-left transition-all hover:from-muted/50 bg-linear-to-tl from-transparent to-transparent outline outline-transparent outline-offset-0 hover:outline-border hover:-outline-offset-6"
          >
            <motion.span
              className="flex items-center gap-4"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={active ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: CONTENT_DURATION,
                delay: delay + CONTENT_DELAY_OFFSET,
                ease: EASE,
              }}
            >
              <span className="flex size-10 outline outline-offset-0 group-hover:outline-offset-4 group-hover:outline-border outline-transparent outline-dotted shrink-0 items-center justify-center border text-muted-foreground transition-all group-hover:bg-linear-to-t from-muted to-transparent group-hover:text-primary">
                <social.icon
                  weight="regular"
                  className="size-5 transition-all group-hover:size-6 group-hover:hidden"
                />
                <social.icon
                  weight="fill"
                  className="hidden size-5 transition-all group-hover:size-6 group-hover:block"
                />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-medium text-foreground">
                  {social.label}
                </span>
                <span className="truncate font-mono text-xs text-muted-foreground">
                  {social.caption ??
                    (social.captionKey
                      ? t.contact.captions[social.captionKey]
                      : "")}
                </span>
              </span>
              <ArrowUpRightIcon className="size-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100" />
            </motion.span>
          </a>
        );
      })}
    </div>
  );
}

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
