import { useEffect, useState, type ComponentProps } from "react";

/**
 * Renders the first candidate URL that loads successfully, trying the next
 * one on error (e.g. `banner.jpg` vs `banner.png`). Renders nothing once
 * every candidate has failed.
 */
export default function FallbackImage({
  candidates,
  ...imgProps
}: { candidates: string[] } & Omit<ComponentProps<"img">, "src">) {
  const [index, setIndex] = useState(0);
  const key = candidates.join("|");

  useEffect(() => {
    setIndex(0);
  }, [key]);

  if (index >= candidates.length) return null;

  return (
    <img
      {...imgProps}
      src={candidates[index]}
      onError={() => setIndex((i) => i + 1)}
    />
  );
}
