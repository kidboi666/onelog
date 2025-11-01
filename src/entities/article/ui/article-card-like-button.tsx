import { Heart } from "lucide-react";
import type { MouseEvent } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";

type LikeButtonProps = {
  onClick: (e: MouseEvent) => void;
  likeCount?: number;
  isLike?: boolean;
};

export const ArticleCardLikeButton = ({
  likeCount = 0,
  onClick,
  isLike = false,
}: LikeButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={onClick}
            className={cn(
              "gap-1 font-light text-xs transition-colors hover:text-red-500",
              isLike && "text-red-500",
            )}
          >
            <Heart className={cn("size-4", isLike && "fill-red-500")} />
            {likeCount ?? 0}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>좋아요</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
