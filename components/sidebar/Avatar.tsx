import { useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/language.provider";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import Confetti from "react-confetti-boom";

function Avatar({ className }: { className?: string }) {
  const { t } = useLanguage();
  const avatarRef = useRef<HTMLSpanElement>(null);
  const [boom, setBoom] = useState<{
    key: number;
    x: number;
    y: number;
  } | null>(null);

  const handleClick = () => {
    const rect = avatarRef.current?.getBoundingClientRect();
    setBoom((prev) => ({
      key: (prev?.key ?? 0) + 1,
      x: rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5,
      y: rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5,
    }));
  };

  return (
    <>
      {boom && (
        <div className="fixed inset-0 z-100 pointer-events-none">
          <Confetti
            key={boom.key}
            mode="boom"
            particleCount={24}
            shapeSize={8}
            deg={0}
            effectCount={1}
            effectInterval={0}
            spreadDeg={180}
            x={boom.x}
            y={boom.y}
            launchSpeed={0.4}
            opacityDeltaMultiplier={1.5}
            colors={["#ff577f", "#ff884b", "#a0ff83", "#05afff"]}
          />
        </div>
      )}
      <Tooltip>
        <TooltipTrigger
          className={cn("group relative flex shrink-0", className)}
          onClick={handleClick}
        >
          <span
            ref={avatarRef}
            className="size-10 relative rounded-full border overflow-hidden transition-transform duration-150 active:scale-90"
          >
            <img
              src="/images/me_1.png"
              alt="me at my 22nd birthday"
              className="object-cover opacity-100 transition-all absolute size-10 group-hover:scale-110"
            />
            <img
              src="/images/me_2.png"
              alt="me at my 22nd birthday"
              className="object-cover group-hover:opacity-100 opacity-0 transition-all absolute size-10 group-hover:scale-110"
            />
          </span>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="center">
          {t.easterEgg}
        </TooltipContent>
      </Tooltip>
    </>
  );
}

export default Avatar;
