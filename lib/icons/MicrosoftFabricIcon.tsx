import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
  width?: string;
  height?: string;
};

/** Solid single-color simplification of Microsoft Fabric's faceted gem mark. */
function MicrosoftFabricIcon({
  width = "1em",
  height = "1em",
  ...props
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 1.5 22.5 12 12 22.5 1.5 12 12 1.5Z"
      />
      <path
        d="M12 1.5 12 22.5M1.5 12 22.5 12"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="0.75"
      />
    </svg>
  );
}

export default MicrosoftFabricIcon;
