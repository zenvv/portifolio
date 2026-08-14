import * as React from "react";
import { Link, type LinkProps } from "react-router";
import { Button } from "./ui/button";

type NavDirection = "forward" | "backward";

const TransitionLink = React.forwardRef<
  HTMLAnchorElement,
  LinkProps & { direction: NavDirection }
>(({ direction, onClick, ...props }, ref) => {
  return (
    <Button
      variant={"ghost"}
      render={
        <Link
          ref={ref}
          viewTransition
          onClick={(event) => {
            document.documentElement.dataset.navDirection = direction;
            onClick?.(event);
          }}
          {...props}
        />
      }
    />
  );
});
TransitionLink.displayName = "TransitionLink";

export default TransitionLink;
