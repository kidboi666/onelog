import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { ROUTES } from "@/app/_routes/constants";
import { useMe } from "@/app/_store/use-me";
import { useLikeMutates } from "@/hooks/mutates/useLikeMutates";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/utils/tw-merge";

interface Props {
  viewToolTip?: boolean;
  isSide?: boolean;
  postId: number;
  likeCount: number;
  isLike: boolean;
}

export default function LikeButton({
  viewToolTip,
  isSide,
  likeCount,
  postId,
  isLike,
}: Props) {
  const router = useRouter();
  const { me } = useMe();
  const { onLikePost } = useLikeMutates({ isLike, postId });

  const authGuard = () =>
    router.push(ROUTES.MODAL.AUTH.GUARD, { scroll: false });

  const handleFavoritePost = (e: MouseEvent): void => {
    e.stopPropagation();
    me ? onLikePost(e) : authGuard();
  };

  const button = (
    <Button
      variant="ghost"
      size={isSide ? "default" : "sm"}
      onClick={handleFavoritePost}
      className={cn(
        "gap-1 font-light text-xs transition-colors hover:text-red-500",
        isSide && "max-lg:flex-col",
        isLike && "text-red-500",
      )}
    >
      <Heart className={cn("size-4", isLike && "fill-red-500")} />
      {likeCount ?? 0}
    </Button>
  );

  if (viewToolTip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>
            <p>좋아요</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
}
