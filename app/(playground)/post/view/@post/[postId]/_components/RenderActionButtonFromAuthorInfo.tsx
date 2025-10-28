"use client";

import { Loader2 } from "lucide-react";
import useFollowMutates from "@/app/hooks/mutates/useFollowMutates";
import useFollowValidate from "@/app/hooks/queries/useFollowValidate";
import useTransitionWithRoute from "@/app/hooks/useRouterPushWithTransition";
import { ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/components/ui/button";

interface Props {
  meId?: string | null;
  userId: string;
}

export default function RenderActionButtonFromAuthorInfo({
  meId,
  userId,
}: Props) {
  const { isFollowing } = useFollowValidate(userId, meId);
  const { onFollow, isPending } = useFollowMutates({
    isFollowing,
    userId,
  });

  const [isLoadingWrite, startTransitionWrite] = useTransitionWithRoute(
    ROUTES.POST.NEW
  );
  const [isLoadingEditProfile, startTransitionEditProfile] =
    useTransitionWithRoute(ROUTES.PROFILE.EDIT);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col justify-center gap-2"
    >
      {meId === userId ? (
        <>
          <Button
            size="sm"
            disabled={isLoadingWrite}
            onClick={startTransitionWrite}
            className="w-full self-end"
          >
            {isLoadingWrite && <Loader2 className="mr-2 size-4 animate-spin" />}
            글 쓰기
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={startTransitionEditProfile}
            disabled={isLoadingEditProfile}
            className="w-full self-end"
          >
            {isLoadingEditProfile && <Loader2 className="mr-2 size-4 animate-spin" />}
            프로필 수정
          </Button>
        </>
      ) : (
        <>
          <Button
            size="sm"
            disabled={isPending}
            onClick={onFollow}
            className="w-full self-end"
          >
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            {isFollowing ? "팔로우 취소" : "팔로우 하기"}
          </Button>
          <Button variant="secondary" size="sm" className="w-full self-end">
            메세지 보내기
          </Button>
        </>
      )}
    </div>
  );
}
