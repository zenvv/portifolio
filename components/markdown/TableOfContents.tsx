import { useEffect, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { ListBulletsIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type Heading = { id: string; text: string };

/** Reads a project page's `<h2>` sections from the rendered DOM (rather than
 * the markdown source, so it only ever lists real h2s, never a line that
 * looks like one inside a fenced code block) and tracks which is currently
 * in view. */
function useHeadings(containerRef: RefObject<HTMLElement | null>) {
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

  return { headings, activeId };
}

/** The plain index content, no positioning of its own, meant to sit inside
 * a fixed rail alongside {@link ArticleImageIndex}. */
export default function TableOfContents({
  containerRef,
  title,
}: {
  containerRef: RefObject<HTMLElement | null>;
  title: string;
}) {
  const { headings, activeId } = useHeadings(containerRef);

  if (headings.length === 0) return null;

  return (
    <nav aria-label={title} className="flex w-full flex-col gap-0.5 border-l">
      <span className="px-3 pb-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground/60">
        {title}
      </span>
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={cn(
            "truncate px-3 py-1.5 font-mono text-xs  -ml-px border-l-3",
            activeId === h.id
              ? "border-primary font-medium text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}

/** The mobile equivalent: a fixed FAB opening a Sheet drawer. Independent of
 * the desktop fixed rail: always rendered, hides itself above `xl` via CSS.
 * The trigger is portaled straight to `document.body` (rather than left in
 * the article's DOM position) so it stays pinned to the viewport corner
 * regardless of any transformed ancestor upstream (a scroll-reveal
 * `motion.div` mid-animation, for instance) and carries a z-index above the
 * sticky `Navbar` (`z-[500]`) so it never ends up painted under the footer
 * or any other in-flow section. */
export function TableOfContentsMobile({
  containerRef,
  title,
}: {
  containerRef: RefObject<HTMLElement | null>;
  title: string;
}) {
  const { headings, activeId } = useHeadings(containerRef);
  const [open, setOpen] = useState(false);

  if (headings.length === 0) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {createPortal(
        <SheetTrigger
          render={
            <Button
              variant="default"
              size="icon-lg"
              className={cn(
                "fixed bg-foreground hover:bg-foreground text-background right-6 bottom-6 z-600 shadow-lg shadow-black/20 transition-opacity xl:hidden",
                open && "pointer-events-none opacity-0",
              )}
              aria-label={title}
            />
          }
        >
          <ListBulletsIcon className="size-5" />
        </SheetTrigger>,
        document.body,
      )}
      <SheetContent side="right" className="gap-0">
        <SheetHeader className="pb-3">
          <span className="font-mono text-lg uppercase tracking-widest text-muted-foreground/60">
            {title}
          </span>
        </SheetHeader>
        <nav className="flex flex-col overflow-y-auto p-2 pl-0 ml-4 border-l">
          {headings.map((h) => (
            <SheetClose
              key={h.id}
              render={
                <a
                  href={`#${h.id}`}
                  className={cn(
                    "truncate border-l-3 px-3 py-2.5 font-mono text-xs transition-colors",
                    activeId === h.id
                      ? "border-primary font-medium text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                />
              }
            >
              {h.text}
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
