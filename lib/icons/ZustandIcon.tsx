import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
  width?: string;
  height?: string;
};

/** Solid single-color simplification of Zustand's bear mark. */
function ZustandIcon({ width = "1em", height = "1em", ...props }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="6.75" cy="6.75" r="2.75" fill="currentColor" />
      <circle cx="17.25" cy="6.75" r="2.75" fill="currentColor" />
      <circle cx="12" cy="13.25" r="8.25" fill="currentColor" />
    </svg>
  );
}

export default ZustandIcon;
