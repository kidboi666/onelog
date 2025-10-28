"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { useState } from "react";
import { ROUTES } from "@/app/routes";
import { useMe } from "@/app/store/use-me";
import { useHandleFollow } from "@/entities/follow/api/mutates";
import { followQuery } from "@/entities/follow/api/queries";
import Modal from "@/shared/components/Modal";
import { DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import FollowUserCard from "../../_components/FollowUserCard";

interface Props {
  params: { userId: string };
}

export default function FollowingListModal({ params: { userId } }: Props) {
  const router = useRouter();
  const { me } = useMe();
  const { data: followings } = useSuspenseQuery(
    followQuery.getFollowing(userId),
  );
  const { data: myFollows } = useSuspenseQuery(
    followQuery.getFollowing(me?.id || ""),
  );
  const { mutate: followOrUnfollow } = useHandleFollow();
  const [pendingList, setPendingList] = useState<Record<string, boolean>>({});

  const handleFollow = (
    e: MouseEvent,
    targetUserId: string,
    isFollowing: boolean,
  ) => {
    e.stopPropagation();
    if (!me) return router.push(ROUTES.MODAL.AUTH.GUARD);

    setPendingList((prev) => ({ ...prev, [targetUserId]: true }));
    followOrUnfollow(
      {
        followedUserId: targetUserId,
        followerUserId: me.id,
        isFollowing,
      },
      {
        onSettled: () => {
          setPendingList((prev) => ({ ...prev, [targetUserId]: false }));
        },
      },
    );
  };

  const handlePushUserPage = (targetUserId: string) => {
    router.push(ROUTES.PROFILE.VIEW(targetUserId), { scroll: false });
  };

  return (
    <Modal>
      <DialogHeader>
        <DialogTitle>팔로잉 목록</DialogTitle>
      </DialogHeader>
      <div className="flex w-full flex-col gap-2">
        {followings?.map((user) => {
          const isFollowing = myFollows?.some(
            (myFollower) => myFollower.followedUserId === user.userInfo.id,
          );
          const isMe = me?.id === user.followedUserId;
          const isPending = pendingList[user.userInfo.id] || false;

          return (
            <FollowUserCard
              key={user.id}
              isFollowing={!!isFollowing}
              isMe={isMe}
              follower={user}
              onFollow={(e: MouseEvent) =>
                handleFollow(e, user.userInfo.id, !!isFollowing)
              }
              isPending={isPending}
              pushUserPage={() => handlePushUserPage(user.userInfo.id)}
            />
          );
        })}
      </div>
    </Modal>
  );
}
