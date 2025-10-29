"use client";

import { Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { usePostComment } from "@/entities/comment/api/mutates";
import type { IUserInfo } from "@/entities/user/model/types";
import { AuthGuardDialog, SignInDialog, SignUpDialog } from "@/features/auth/ui";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

interface Props {
  postId: number;
  commentId?: number;
  me: IUserInfo | null;
}

export function CommentInput({ postId, commentId, me }: Props) {
  const [content, setContent] = useState("");
  const [showAuthGuard, setShowAuthGuard] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const { mutate: postComment, isPending: isPostPending } = usePostComment();

  const handleRouterGuard = () => {
    if (!me) {
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

  const handlePostComment = (e: FormEvent) => {
    e.preventDefault();
    if (me && content.trim()) {
      postComment(
        {
          userId: me.id,
          content,
          postId: postId,
          commentId: commentId || null,
        },
        {
          onSuccess: () => {
            setContent("");
          },
        },
      );
    }
  };

  return (
    <>
      <form
        onClick={handleRouterGuard}
        onSubmit={handlePostComment}
        className="mb-2 w-full"
      >
        <div className="flex items-center gap-3">
          <Avatar className="size-8 flex-shrink-0">
            <AvatarImage src={me?.avatarUrl || undefined} />
            <AvatarFallback>
              {me?.userName?.[0]?.toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={me ? "댓글을 달아주세요." : "로그인을 해주세요"}
            className="flex-1"
            disabled={!me}
          />
          <Button
            type="submit"
            disabled={!content.trim() || !me || isPostPending}
            size="sm"
          >
            {isPostPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "댓글달기"
            )}
          </Button>
        </div>
      </form>

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
