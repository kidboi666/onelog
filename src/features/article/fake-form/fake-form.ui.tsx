"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthGuardDialog } from "@/entities/auth/ui/auth-guard-dialog";
import { SignInDialog } from "@/features/auth/sign-in/sign-in.ui";
import { SignUpDialog } from "@/features/auth/sign-up/sign-up.ui";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Card } from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/routes";
import { useMe } from "@/shared/store/use-me";

export const FakeForm = () => {
  const router = useRouter();
  const { me } = useMe();
  const [showAuthGuard, setShowAuthGuard] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const pushNewPost = () => router.push(ROUTES.ARTICLE.NEW);

  const handlePostClick = () => {
    if (me) {
      pushNewPost();
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

  return (
    <>
      <Card
        className="flex cursor-pointer gap-4 border-0 p-4"
        onClick={handlePostClick}
      >
        <Avatar className="hidden size-10 sm:flex">
          <AvatarImage src={me?.avatarUrl || undefined} />
          <AvatarFallback>
            {me?.userName?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1 items-center rounded-md bg-muted/50 p-3 text-muted-foreground text-sm">
          오늘 당신의 생각을 한 줄로 기록하세요.
        </div>
      </Card>

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
};
