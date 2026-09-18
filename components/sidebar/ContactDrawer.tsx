// import { AddressBookIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ContactGrid } from "./Contact";
import { useLanguage } from "@/lib/i18n/language.provider";
import { List } from "@phosphor-icons/react";

/** Mobile-only stand-in for the icon row `Navbar` shows from `sm` up: a
 * single trigger that opens a bottom drawer holding the same `ContactGrid`
 * the home page uses, so the channels stay reachable without cramming four
 * icon buttons into a narrow header. */
export default function ContactDrawer({ className }: { className?: string }) {
  const { t } = useLanguage();

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            aria-label={t.contact.heading}
            title={t.contact.heading}
            className={className}
          />
        }
      >
        <List /> Contato
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="max-h-[85dvh] overflow-y-auto dark"
      >
        <SheetHeader className="leading-none gap-0">
          <SheetTitle>Willian Zeni</SheetTitle>
          <SheetDescription>@zenvv</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col px-2 pb-8 gap-4">
          <div className="flex flex-col items-center text-center px-4">
            <h2 className="font-heading italic text-xl">{t.contact.heading}</h2>
            <p className="text-sm text-muted-foreground">
              {t.contact.subheading}
            </p>
          </div>
          <ContactGrid className="flex-col p-4" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
