import { Globe, Lock } from "lucide-react";
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

type AccessTypeButtonProps = {
  isPublic: boolean;
};

export const ArticleDetailAccessTypeButton = ({
  isPublic,
}: AccessTypeButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "gap-1 font-light text-xs transition-colors hover:text-green-400",
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
