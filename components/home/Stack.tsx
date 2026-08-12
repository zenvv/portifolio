import { useLanguage } from "@/lib/i18n/language.provider";

function Stack() {
  const { locale, t } = useLanguage();

  return (
    <div>
      <h2>{t.hero.stack.title}</h2>
    </div>
  );
}

export default Stack;
