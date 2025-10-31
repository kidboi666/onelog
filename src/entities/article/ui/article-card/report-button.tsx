import { Flag } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";

interface Props {
  isSide?: boolean;
  onClick: () => void;
}

export function ReportButton({ isSide, onClick }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size={isSide ? "default" : "sm"}
            onClick={onClick}
            className={cn(
              "gap-2 font-light text-xs transition-colors hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/25 dark:hover:text-red-600",
            )}
          >
            <Flag className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>신고하기</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
