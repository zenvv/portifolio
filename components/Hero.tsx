import { useLanguage } from "@/lib/i18n/language.provider";
import { renderBoldText } from "@/lib/i18n/render-bold";

function Hero() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col flex-1 ">
      <header className="flex md:items-start md:justify-between items-center justify-start md:gap-0 gap-4 w-full mb-8">
        <div className="flex flex-col flex-1 animate-fade-up animate-duration-500 animate-fill-both">
          <span className="text-xl font-semibold transition-all md:hover:font-bold cursor-default">
            {t.hero.greeting}
          </span>
          <span className="text-muted-foreground text-xs md:hover:tracking-wide transition-all cursor-help uppercase tracking-tight">
            {t.hero.label}
          </span>
        </div>
      </header>
      <div className="flex flex-col">
        <p className="uppercase text-xs text-muted-foreground/60 mb-1 animate-fade-up animate-duration-500 animate-delay-150 animate-fill-both">
          {t.hero.aboutTitle}
        </p>
        <p className="text-sm text-muted-foreground tracking-tight w-full animate-fade-up animate-duration-500 animate-delay-300 animate-fill-both">
          {renderBoldText(t.hero.aboutMe1, "font-bold text-foreground")}
        </p>
        <p className="text-sm text-muted-foreground tracking-tight w-full animate-fade-up animate-duration-500 animate-delay-450 animate-fill-both">
          {renderBoldText(t.hero.aboutMe2, "font-bold text-foreground")}
        </p>
      </div>
    </div>
  );
}

export default Hero;
