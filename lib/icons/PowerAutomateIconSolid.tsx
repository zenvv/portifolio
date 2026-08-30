import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
  width?: string;
  height?: string;
};

/** Solid single-color silhouette of the Power Automate mark. */
function PowerAutomateIconSolid({
  width = "1em",
  height = "1em",
  ...props
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 423 348"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="currentColor"
        d="M268.462 0C270.996 0 273.412 1.06812 275.118 2.94141L415.152 156.75C425.351 167.953 425.209 185.119 414.825 196.15L280.938 338.378C275.458 344.199 267.817 347.5 259.822 347.5H29.056C4.13641 347.5 -9.17792 318.145 7.23766 299.396L117.249 173.75L7.23766 48.1035C-9.17803 29.3546 4.13708 0 29.057 0H268.462ZM136.086 179.56C136.053 179.6 136.018 179.639 135.984 179.679L20.7806 311.254C14.554 318.365 19.6039 329.5 29.056 329.5H135.345L336.384 96.9717L268.713 22.6445L136.086 179.56ZM159.142 329.5H259.822C262.854 329.5 265.753 328.248 267.831 326.04L401.718 183.813C405.657 179.629 405.711 173.118 401.842 168.868L348.59 110.378L159.142 329.5ZM29.057 18C19.6046 18 14.5539 29.1344 20.7806 36.2461L129.091 159.949L249.071 18H29.057Z"
      />
    </svg>
  );
}

export default PowerAutomateIconSolid;
