"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useTransition } from "react";
import { ROUTES } from "@/app/_routes/constants";
import { useMe } from "@/app/_store/use-me";
import { useHandleFollow } from "@/entities/follow/api/mutates";
import { followQueries } from "@/entities/follow/api/queries";
import { Button } from "@/shared/components/ui/button";

interface Props {
  userId: string;
}

export default function RenderActionButtonFromProfile({ userId }: Props) {
  const router = useRouter();
  const { me } = useMe();
  const [isLoadingProfile, startProfileTransition] = useTransition();
  const [isLoadingWrite, startWriteTransition] = useTransition();

  const { data: followingList } = useSuspenseQuery(
    followQueries.getFollowing(me?.id ?? ""),
  );
  const { mutate: handleFollow, isPending } = useHandleFollow();

  const isMyProfilePage = me?.id === userId;
  const isFollowing = useMemo(
    () => followingList?.some((follower) => follower.followedUserId === userId),
    [followingList, userId],
  );

  const handlePushEditProfilePage = () => {
    startProfileTransition(() => {
      router.push(ROUTES.PROFILE.EDIT);
    });
  };

  const handlePushNewPostPage = () => {
    startWriteTransition(() => {
      router.push(ROUTES.POST.NEW);
    });
  };

  const onFollow = () => {
    if (!me?.id) return;
    handleFollow({
      followedUserId: userId,
      followerUserId: me.id,
      isFollowing: isFollowing ?? false,
    });
  };

  const handleSendMessageButtonClick = () => {
    // TODO: Implement message feature with redis
    return null;
  };

  return (
    <div className="flex gap-4">
      {isMyProfilePage ? (
        <>
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePushEditProfilePage}
            disabled={isLoadingProfile}
            className="text-nowrap"
          >
            {isLoadingProfile && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            프로필 수정
          </Button>
          <Button
            size="sm"
            onClick={handlePushNewPostPage}
            disabled={isLoadingWrite}
          >
            {isLoadingWrite && <Loader2 className="mr-2 size-4 animate-spin" />}
            글쓰기
          </Button>
        </>
      ) : (
        <>
          <Button
            variant={isFollowing ? "secondary" : "default"}
            size="sm"
            onClick={onFollow}
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            {isFollowing ? "팔로우 취소" : "팔로우 하기"}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleSendMessageButtonClick}
          >
            메시지 보내기
          </Button>
        </>
      )}
    </div>
  );
}
