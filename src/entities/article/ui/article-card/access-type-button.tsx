import { Globe, Lock } from "lucide-react";
import type { MouseEvent } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";

type Access = "public" | "private" | "friends";

interface Props {
  isSide?: boolean;
  accessType: Access;
}

export const AccessTypeButton = ({ isSide, accessType }: Props) => {
  const handleButtonClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const isPublic = accessType === "public";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size={isSide ? "default" : "sm"}
                onClick={handleButtonClick}
                className={cn(
                  "gap-1 font-light text-xs transition-colors hover:text-green-400",
                  isSide && "max-lg:flex-col",
                )}
              >
                {isPublic ? (
                  <Globe className="size-4" />
                ) : (
                  <Lock className="size-4" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" side="top">
              <p className="text-nowrap text-sm">
                {isPublic ? "공개" : "비공개"}
              </p>
            </PopoverContent>
          </Popover>
        </TooltipTrigger>
        <TooltipContent>
          <p>게시 여부</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
