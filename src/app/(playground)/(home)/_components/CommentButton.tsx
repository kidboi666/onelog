import { MessageCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/utils/tw-merge";

interface Props {
  disabled?: boolean;
  commentCount: number | null;
  viewToolTip?: boolean;
  isSide?: boolean;
}

export default function CommentButton({
  disabled,
  viewToolTip,
  isSide,
  commentCount,
}: Props) {
  const button = (
    <Button
      variant="ghost"
      size={isSide ? "default" : "sm"}
      disabled={disabled}
      className={cn(
        "gap-1 text-xs font-light transition-colors hover:text-blue-400",
        isSide && "max-lg:flex-col"
      )}
    >
      <MessageCircle className="size-4" />
      {commentCount ?? 0}
    </Button>
  );

  if (viewToolTip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>
            <p>댓글</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
}
