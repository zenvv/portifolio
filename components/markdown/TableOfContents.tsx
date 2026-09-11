import { useEffect, useState, type RefObject } from "react";
import { ListBulletsIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type Heading = { id: string; text: string };

/** Sticky index of a project page's `<h2>` sections: an inline list on
 * wide viewports (xl+, where the fixed-width content shell has room to
 * spare) and a Sheet drawer everywhere else, so the reading column never
 * narrows on anything but the widest screens.
 *
 * Reads headings from the rendered DOM rather than the markdown source so
 * it only ever lists real h2s (not lines that look like one inside a
 * fenced code block), and always matches the ids MarkdownH2 assigned. */
export default function TableOfContents({
  containerRef,
  title,
}: {
  containerRef: RefObject<HTMLElement | null>;
  title: string;
}) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const els = Array.from(
      container.querySelectorAll<HTMLHeadingElement>("h2[id]"),
    );
    setHeadings(els.map((el) => ({ id: el.id, text: el.textContent ?? "" })));
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef]);

  if (headings.length === 0) return null;

  return (
    <>
      <nav
        aria-label={title}
        className="sticky top-20 hidden h-fit w-52 shrink-0 flex-col gap-0.5 self-start xl:flex"
      >
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={cn(
              "truncate rounded-md px-3 py-1.5 text-xs transition-colors",
              activeId === h.id
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {h.text}
          </a>
        ))}
      </nav>

      <Sheet>
        <SheetTrigger
          render={
            <Button
              variant="outline"
              size="icon-lg"
              className="fixed right-6 bottom-6 z-40 rounded-full shadow-lg xl:hidden"
              aria-label={title}
            />
          }
        >
          <ListBulletsIcon className="size-5" />
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 p-4 pt-0">
            {headings.map((h) => (
              <SheetClose
                key={h.id}
                render={
                  <a
                    href={`#${h.id}`}
                    className="rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted"
                  />
                }
              >
                {h.text}
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
