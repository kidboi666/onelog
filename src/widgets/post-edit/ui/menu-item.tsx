import { ReactNode } from "react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/tw-merge";

export function MenuItem({
  icon,
  title,
  action,
  isActive = null,
}: {
  icon?: ReactNode;
  title?: string;
  action?: () => void;
  isActive?: (() => boolean) | null;
}) {
  return (
    <Button
      onClick={action}
      title={title}
      variant="ghost"
      size="icon"
      className={cn(
        "size-6 p-0",
        isActive && isActive() ? "bg-zinc-300 dark:bg-zinc-600" : ""
      )}
    >
      {icon}
    </Button>
  );
}
