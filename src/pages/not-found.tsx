import { Link } from "react-router";
import { useLanguage } from "@/lib/i18n/language.provider";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@phosphor-icons/react";

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-3 items-center justify-center font-mono">
      <Button variant="outline" className="font-sans self-start">
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeftIcon />
          {t.notFound.backHome}
        </Link>
      </Button>
      <span className="flex flex-col items-center justify-center w-full border bg-card p-4 py-8 rounded-md text-center">
        <code className="">
          ____________/\\\________/\\\\\\\_______________/\\\____
          __________/\\\\\______/\\\/////\\\___________/\\\\\____
          ________/\\\/\\\_____/\\\____\//\\\________/\\\/\\\____
          ______/\\\/\/\\\____\/\\\_____\/\\\______/\\\/\/\\\____
          ____/\\\/__\/\\\____\/\\\_____\/\\\____/\\\/__\/\\\____
          __/\\\\\\\\\\\\\\\\_\/\\\_____\/\\\__/\\\\\\\\\\\\\\\\_
          _\///////////\\\//__\//\\\____/\\\__\///////////\\\//__
          ___________\/\\\_____\///\\\\\\\/_____________\/\\\____
          ___________\///________\///////_______________\///_____
        </code>
        <span className="text-lg font-semibold mt-8">
          {t.notFound.title} :(
        </span>
        <p className="text-sm text-muted-foreground">
          {t.notFound.description}
        </p>
      </span>
    </div>
  );
}
