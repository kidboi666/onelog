"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/routes/constants";
import { useMe } from "@/app/_store/use-me";
import { useHandleFollow } from "@/entities/follow";

interface Props {
  isFollowing: boolean;
  userId: string;
}

export function useFollowMutates({ isFollowing, userId }: Props) {
  const router = useRouter();
  const { me } = useMe();
  const { mutate: followOrUnfollow, isPending } = useHandleFollow();

  const pushFollowerList = () =>
    router.push(ROUTES.MODAL.FOLLOW.FOLLOWER(userId));

  const pushFollowingList = () =>
    router.push(ROUTES.MODAL.FOLLOW.FOLLOWING(userId));

  const authGuard = () =>
    router.push(ROUTES.MODAL.AUTH.GUARD, { scroll: false });

  const handleFollow = (options?: any) => {
    me
      ? followOrUnfollow(
          {
            followedUserId: userId,
            followerUserId: me.id,
            isFollowing,
          },
          { ...options },
        )
      : authGuard();
  };

  return {
    onFollow: handleFollow,
    pushFollowerList,
    pushFollowingList,
    isPending,
  };
}
