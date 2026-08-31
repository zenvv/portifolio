import { useEffect, useState, type ComponentProps } from "react";
import { Img } from "@/components/ui/image";

/**
 * Renders the first candidate URL that loads successfully, trying the next
 * one on error (e.g. `banner.jpg` vs `banner.png`). Shows a skeleton while a
 * candidate is loading; renders nothing once every candidate has failed.
 */
export default function FallbackImage({
  candidates,
  wrapperClassName,
  fluid,
  ...imgProps
}: {
  candidates: string[];
  wrapperClassName?: string;
  fluid?: boolean;
} & Omit<ComponentProps<"img">, "src">) {
  const [index, setIndex] = useState(0);
  const key = candidates.join("|");

  useEffect(() => {
    setIndex(0);
  }, [key]);

  if (index >= candidates.length) return null;

  return (
    <Img
      key={candidates[index]}
      {...imgProps}
      src={candidates[index]}
      wrapperClassName={wrapperClassName}
      fluid={fluid}
      onError={() => setIndex((i) => i + 1)}
    />
  );
}
