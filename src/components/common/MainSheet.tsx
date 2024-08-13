import * as React from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { cn } from "@/lib/utils";

export function MainSheet({
  open,
  side,
  title,
  className,
  titleClassName,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  className?: string;
  titleClassName?: string;
  side: "left" | "right" | "bottom" | "top";
  children: React.ReactElement;
  onClose: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side={side}
        className={cn("!px-0 dark:bg-[background] ", className)}
      >
        <div className="space-y-4">
          <div className="px-3">
            {
              <SheetTitle
                className={cn(
                  "mb-2 px-4 text-lg font-semibold tracking-tight",
                  titleClassName
                )}
              >
                {title}
              </SheetTitle>
            }
            <div className={cn("space-y-1")}>{children}</div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
