import { useRef } from "react";
import TransitionLink from "../TransitionLink";

function Avatar() {
  const avatarRef = useRef<HTMLSpanElement>(null);

  return (
    <TransitionLink
      to="/"
      direction="backward"
      className="bg-transparent! hover:bg-transparent!"
    >
      <span
        ref={avatarRef}
        className="size-9 relative rounded-full border overflow-hidden transition-transform duration-150 active:scale-90"
      >
        <img
          src="/images/me_1.png"
          alt="me at my 22nd birthday"
          className="object-cover opacity-100 transition-all absolute size-9 group-hover:scale-110"
        />
      </span>
    </TransitionLink>
  );
}

export default Avatar;
