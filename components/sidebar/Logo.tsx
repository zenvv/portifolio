import TransitionLink from "../TransitionLink";

function Logo() {
  return (
    <TransitionLink
      to="/"
      direction="backward"
      className="bg-transparent! hover:bg-transparent! flex flex-row gap-2 items-center"
    >
      <img src="/logo.svg" alt="logo svg" className="size-6" />
      <span className="flex flex-col leading-none">
        <p>Willian Zeni</p>
        <span className="text-xs text-muted-foreground">@zenvv</span>
      </span>
    </TransitionLink>
  );
}

export default Logo;
