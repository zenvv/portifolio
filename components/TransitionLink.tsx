import * as React from "react";
import { Link, type LinkProps } from "react-router";
import { Button, type buttonVariants } from "./ui/button";
import type { VariantProps } from "class-variance-authority";

type NavDirection = "forward" | "backward";

type TransitionLinkProps = LinkProps &
  VariantProps<typeof buttonVariants> & {
    direction: NavDirection;
    /** Render a bare, unstyled <Link> instead of wrapping it in the Button component. */
    plain?: boolean;
  };

const TransitionLink = React.forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ direction, onClick, plain, variant = "ghost", size, ...props }, ref) => {
    const handleClick: LinkProps["onClick"] = (event) => {
      document.documentElement.dataset.navDirection = direction;
      onClick?.(event);
    };

    if (plain) {
      return (
        <Link ref={ref} viewTransition onClick={handleClick} {...props} />
      );
    }

    return (
      <Button
        variant={variant}
        size={size}
        render={
          <Link ref={ref} viewTransition onClick={handleClick} {...props} />
        }
      />
    );
  },
);
TransitionLink.displayName = "TransitionLink";

export default TransitionLink;
