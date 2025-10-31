import { MessageCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";

interface Props {
  commentCount?: number;
  isSide?: boolean;
}

export const CommentButton = ({ isSide, commentCount = 0 }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size={isSide ? "default" : "sm"}
            className={cn(
              "gap-1 font-light text-xs transition-colors hover:text-blue-400",
              isSide && "max-lg:flex-col",
            )}
          >
            <MessageCircle className="size-4" />
            {commentCount ?? 0}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>댓글</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
