import { useEffect, useRef, useState, type ReactNode } from "react";

/** A sidebar that is genuinely `fixed`: it never scrolls with the page,
 * unlike a `sticky` element (which stays in the page's flow and can end up
 * overlapping whatever comes after it once its own content is taller than
 * expected). A hidden placeholder reserves the column's width in the normal
 * flex flow so the article column next to it doesn't shift; the visible
 * panel tracks that placeholder's left edge (recomputed on resize) and its
 * top edge (recomputed on scroll too), clamped to never rise above `top`,
 * so it starts exactly where the placeholder begins (i.e. at the article
 * text, not floating over the masthead/banner above it) and only locks to
 * `top` once the page has scrolled that far. Its own content scrolls
 * internally if it's taller than the viewport allows. */
export default function SidebarRail({
  children,
  width = 208,
  top = 128,
}: {
  children: ReactNode;
  width?: number;
  top?: number;
}) {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState<number | null>(null);
  const [rectTop, setRectTop] = useState<number | null>(null);

  useEffect(() => {
    const el = placeholderRef.current;
    if (!el) return;

    function update() {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setLeft(rect.left);
      setRectTop(rect.top);
    }
    update();

    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  const clampedTop = rectTop !== null ? Math.max(top, rectTop) : null;

  return (
    <div
      ref={placeholderRef}
      className="hidden shrink-0 xl:block"
      style={{ width }}
    >
      {left !== null && clampedTop !== null ? (
        <div
          className="fixed hidden flex-col gap-6 overflow-y-auto xl:flex"
          style={{
            left,
            top: clampedTop,
            width,
            maxHeight: `calc(100dvh - ${clampedTop}px - 1.5rem)`,
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
