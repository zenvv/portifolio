import * as React from "react";
import { Link, type LinkProps } from "react-router";
import { Button, type buttonVariants } from "./ui/button";
import type { VariantProps } from "class-variance-authority";
import { prefetchRoute } from "@/src/route-prefetch";

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
      ...props
    },
    ref,
  ) => {
    const handleClick: LinkProps["onClick"] = (event) => {
      document.documentElement.dataset.navDirection = direction;
      onClick?.(event);
    };

    // Warm the target route's chunk the moment the user shows intent, so the
    // navigation itself doesn't have to wait on a network round trip (which is
    // what makes the view transition flash a blank page).
    const prefetch = () => {
      const path = toPathname(props.to);
      if (path) prefetchRoute(path);
    };

    const linkProps: LinkProps = {
      ...props,
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
