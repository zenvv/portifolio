import * as React from "react";
import { Link, type LinkProps } from "react-router";
import { Button, type buttonVariants } from "./ui/button";
import type { VariantProps } from "class-variance-authority";
import { prefetchRoute } from "@/src/route-prefetch";
import { useLanguage } from "@/lib/i18n/language.provider";
import { localizePath } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/translations";

type NavDirection = "forward" | "backward";

type TransitionLinkProps = LinkProps &
  VariantProps<typeof buttonVariants> & {
    direction: NavDirection;
    /** Render a bare, unstyled <Link> instead of wrapping it in the Button component. */
    plain?: boolean;
  };

function toPathname(to: LinkProps["to"]): string | undefined {
  if (typeof to === "string") return to;
  return to?.pathname;
}

/** Rewrites an in-app `to` (string or {pathname}) to the current locale's
 * URL, so every internal link stays on "/en/..." once there without every
 * call site having to know about the prefix. Absolute (http...) targets are
 * left untouched. */
function localizeTo(to: LinkProps["to"], locale: Locale): LinkProps["to"] {
  if (typeof to === "string") {
    if (/^https?:\/\//.test(to) || !to.startsWith("/")) return to;
    return localizePath(to, locale);
  }
  if (to?.pathname?.startsWith("/")) {
    return { ...to, pathname: localizePath(to.pathname, locale) };
  }
  return to;
}

const TransitionLink = React.forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  (
    {
      direction,
      onClick,
      onMouseEnter,
      onFocus,
      onTouchStart,
      plain,
      variant = "ghost",
      size,
      to,
      ...props
    },
    ref,
  ) => {
    const { locale } = useLanguage();
    const localizedTo = localizeTo(to, locale);

    const handleClick: LinkProps["onClick"] = (event) => {
      document.documentElement.dataset.navDirection = direction;
      onClick?.(event);
    };

    // Warm the target route's chunk the moment the user shows intent, so the
    // navigation itself doesn't have to wait on a network round trip (which is
    // what makes the view transition flash a blank page).
    const prefetch = () => {
      const path = toPathname(localizedTo);
      if (path) prefetchRoute(path);
    };

    const linkProps: LinkProps = {
      ...props,
      to: localizedTo,
      viewTransition: true,
      onClick: handleClick,
      onMouseEnter: (event) => {
        prefetch();
        onMouseEnter?.(event);
      },
      onFocus: (event) => {
        prefetch();
        onFocus?.(event);
      },
      onTouchStart: (event) => {
        prefetch();
        onTouchStart?.(event);
      },
    };

    if (plain) {
      return <Link ref={ref} {...linkProps} />;
    }

    return (
      <Button
        variant={variant}
        size={size}
        render={<Link ref={ref} {...linkProps} />}
      />
    );
  },
);
TransitionLink.displayName = "TransitionLink";

export default TransitionLink;
