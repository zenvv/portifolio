import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

/**
 * Decorative glass "Z" insignia sitting behind the home-page content.
 *
 * This used to be a live three.js render (two stacked `GlassObject`s). It's
 * completely static, so it's now just a pre-rendered PNG per theme
 * (`/public/logo-badge-{light,dark}.png`) — no WebGL, no ~700 KB of three.js,
 * no render loop. Re-bake the PNGs with the temp `/__capture` route if the
 * look ever needs to change.
 */
function useResolvedTheme(): "light" | "dark" {
  const { theme } = useTheme();
  const [systemDark, setSystemDark] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemDark(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (theme === "dark") return "dark";
  if (theme === "light") return "light";
  return systemDark ? "dark" : "light";
}

export default function GlassBadge({ className }: { className?: string }) {
  const theme = useResolvedTheme();
  const src = `/logo-badge-${theme}.png`;
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const loaded = loadedSrc === src;

  return (
    <div aria-hidden className={cn("pointer-events-none", className)}>
      <img
        key={theme}
        src={src}
        alt=""
        decoding="async"
        className={cn(
          "h-full w-full object-contain transition-[opacity,transform,filter] duration-1000 ease-out",
          "motion-reduce:transition-none motion-reduce:duration-0",
          loaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-sm scale-95",
        )}
        onLoad={() => setLoadedSrc(src)}
      />
    </div>
  );
}
