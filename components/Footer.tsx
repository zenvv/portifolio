import { SocialIconLinks } from "@/components/sidebar/Contact";

/** Sitewide footer: a plain, lighter-toned band (distinct from the page
 * background) with the name/handle on one side, contact links on the other,
 * and a giant low-opacity "zenvv" wordmark bleeding across the background as
 * a watermark, deliberately quiet next to it, not another composition. */
export default function Footer() {
  return (
    <footer className="relative mt-auto w-full overflow-hidden">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
      >
        <span className="whitespace-nowrap font-heading text-[50vw] leading-none text-foreground/5 italic sm:text-[30vw] lg:text-[30vw]">
          zenvv
        </span>
      </span>

      <div className="relative flex w-full flex-col bg-linear-to-t from-background to-transparent">
        <div className="flex w-full flex-col items-center sm:text-left text-center gap-8 px-6 sm:h-40 sm:flex-row sm:justify-between py-10 sm:py-0 max-w-7xl mx-auto">
          <div className="flex flex-col gap-1">
            <span className="font-heading leading-none text-foreground italic text-2xl">
              Willian Zeni
            </span>
            <span className="font-mono text-xs leading-none text-muted-foreground">
              @zenvv
            </span>
          </div>

          <SocialIconLinks className="flex-wrap" />
        </div>
      </div>
    </footer>
  );
}
