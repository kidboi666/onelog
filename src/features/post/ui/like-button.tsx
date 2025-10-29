"use client";

import { Heart } from "lucide-react";
import type { MouseEvent } from "react";
import { useState } from "react";
import { useMe } from "@/app/_store/use-me";
import { AuthGuardDialog, SignInDialog, SignUpDialog } from "@/features/auth/ui";
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

export function LikeButton({
  viewToolTip,
  isSide,
  likeCount,
  postId,
  isLike,
}: Props) {
  const { me } = useMe();
  const [showAuthGuard, setShowAuthGuard] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const { onLikePost } = useLikeMutates({ isLike, postId });

  const handleFavoritePost = (e: MouseEvent): void => {
    e.stopPropagation();
    if (me) {
      onLikePost(e);
    } else {
      setShowAuthGuard(true);
    }
  };

  const handleSignInClick = () => {
    setShowAuthGuard(false);
    setShowSignIn(true);
  };

  const handleSwitchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const handleSwitchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
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

  return (
    <>
      {viewToolTip ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent>
              <p>좋아요</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        button
      )}

      {/* Auth Dialogs */}
      <AuthGuardDialog
        open={showAuthGuard}
        onOpenChange={setShowAuthGuard}
        onSignInClick={handleSignInClick}
      />
      <SignInDialog
        open={showSignIn}
        onOpenChange={setShowSignIn}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
      <SignUpDialog
        open={showSignUp}
        onOpenChange={setShowSignUp}
        onSwitchToSignIn={handleSwitchToSignIn}
      />
    </>
  );
}
