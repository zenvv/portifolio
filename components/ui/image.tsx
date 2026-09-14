import { useState, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ImgProps = Omit<ComponentProps<"img">, "ref"> & {
  /**
   * Classes for the wrapper box. Give it the size the image should occupy
   * (`aspect-video w-full`, `size-10`, …); in the default (cover) mode the
   * `<img>` is absolutely positioned to fill this box, so the wrapper is the
   * single source of truth for dimensions and the image can never distort it.
   */
  wrapperClassName?: string;
  /**
   * Let the image flow at its natural height instead of filling the wrapper.
   * Use for content images whose aspect ratio isn't known ahead of time
   * (give the wrapper a `min-h-*` so it reserves space before it loads).
   */
  fluid?: boolean;
};

/**
 * `<img>` that fades in once it decodes. The wrapper box (`wrapperClassName`)
 * is the single source of truth for dimensions, so there's no layout shift
 * even with no placeholder shown while it loads.
 */
export function Img({
  className,
  wrapperClassName,
  fluid = false,
  onLoad,
  onError,
  ...props
}: ImgProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span
      className={cn("relative block overflow-hidden", wrapperClassName)}
    >
      <img
        {...props}
        className={cn(
          fluid ? "block w-full" : "absolute inset-0 h-full w-full object-cover",
          "transition-opacity duration-300 ease-out",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setLoaded(true);
          onError?.(event);
        }}
      />
    </span>
  );
}

export default Img;
