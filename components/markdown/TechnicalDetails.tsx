import { useState, type ReactNode } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { CaretDownIcon, CodeIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

/** Wraps a project's full technical write-up (architecture, data model,
 * flows, stack, the Claude Code transparency note) closed by default: the
 * fixed template's sections 1-11 carry the reader in ~2 minutes, and this is
 * where anyone who wants more keeps going. Projects that don't use the fixed
 * template yet (`hideTrigger`) render the same content plainly, always
 * open, matching the previous always-visible markdown body. */
export default function TechnicalDetails({
  title,
  hideTrigger = false,
  children,
}: {
  title: string;
  hideTrigger?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  if (hideTrigger) return <div className="w-full flex-1">{children}</div>;

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full border-t">
      <div className="flex justify-center py-4">
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs" />
          }
        >
          <CodeIcon className="size-3.5" />
          {title}
          <CaretDownIcon
            className={cn("size-3 transition-transform", open && "rotate-180")}
          />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}
