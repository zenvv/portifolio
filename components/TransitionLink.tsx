import * as React from "react";
import { Link, type LinkProps } from "react-router";

type NavDirection = "forward" | "backward";

const TransitionLink = React.forwardRef<HTMLAnchorElement, LinkProps & { direction: NavDirection }>(
  ({ direction, onClick, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        viewTransition
        onClick={(event) => {
          document.documentElement.dataset.navDirection = direction;
          onClick?.(event);
        }}
        {...props}
      />
    );
  },
);
TransitionLink.displayName = "TransitionLink";

export default TransitionLink;
