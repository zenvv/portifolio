import TransitionLink from "../TransitionLink";

function Logo() {
  return (
    <TransitionLink
      to="/"
      direction="backward"
      className="bg-transparent! hover:bg-transparent! flex flex-row gap-2 items-center"
    >
      <img src="/logo.svg" alt="logo svg" className="size-6" />
      <span className="hidden flex-col leading-none sm:flex">
        <p className="font-heading italic font-medium">Willian Zeni</p>
        <span className="font-mono text-[0.65rem] text-muted-foreground">
          @zenvv
        </span>
      </span>
    </TransitionLink>
  );
}

export default Logo;
