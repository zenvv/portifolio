import { ListIcon } from "@phosphor-icons/react";
import TransitionLink from "@/components/TransitionLink";
import { Button } from "@/components/ui/button";
import ContactLinks from "@/components/sidebar/Contact";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { useLanguage } from "@/lib/i18n/language.provider";

const LINKS = [
  { to: "/", direction: "backward" as const, key: "home" as const },
  { to: "/projects", direction: "forward" as const, key: "projects" as const },
];

const LINK_CLASS =
  "text-sm text-muted-foreground hover:text-foreground transition-colors";

/** Header nav links: inline on md+, collapsed into a Sheet drawer below
 * that (same overlay primitive the tech-stack "Show all" dialog uses). */
export default function NavLinks() {
  const { t } = useLanguage();

  return (
    <>
      <nav className="hidden items-center gap-6 md:flex">
        {LINKS.map((link) => (
          <TransitionLink
            key={link.key}
            to={link.to}
            direction={link.direction}
            plain
            className={LINK_CLASS}
          >
            {t.nav[link.key]}
          </TransitionLink>
        ))}
      </nav>

      <Sheet>
        <SheetTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              className="md:hidden"
              aria-label={t.nav.menu}
            />
          }
        >
          <ListIcon className="size-4" />
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>{t.nav.menu}</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 p-4 pt-0">
            {LINKS.map((link) => (
              <SheetClose
                key={link.key}
                render={
                  <TransitionLink
                    to={link.to}
                    direction={link.direction}
                    plain
                    className="rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted"
                  />
                }
              >
                {t.nav[link.key]}
              </SheetClose>
            ))}
          </nav>
          <div className="border-t p-4">
            <ContactLinks layout="column" />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
