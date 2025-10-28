"use client";

import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { MouseEvent } from "react";
import { useState } from "react";
import { useMe } from "@/core/store/use-me";
import { followQuery } from "@/entities/follow/api/queries";
import { useHandleFollow } from "@/entities/follow/api/mutates";
import { ROUTES } from "@/core/routes";
import { DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import Modal from "@/shared/components/Modal";
import FollowUserCard from "../../_components/FollowUserCard";

interface Props {
  params: { userId: string };
}

export default function FollowerListModal({ params: { userId } }: Props) {
  const router = useRouter();
  const { me } = useMe();
  const { data: followers } = useSuspenseQuery(followQuery.getFollower(userId));
  const { data: myFollows } = useSuspenseQuery(
    followQuery.getFollowing(me?.id || "")
  );
  const { mutate: followOrUnfollow } = useHandleFollow();
  const [pendingList, setPendingList] = useState<Record<string, boolean>>({});

  const handleFollow = (
    e: MouseEvent,
    targetUserId: string,
    isFollowing: boolean
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
      }
    );
  };

  const handlePushUserPage = (targetUserId: string) => {
    router.push(ROUTES.PROFILE.VIEW(targetUserId), { scroll: false });
  };

  return (
    <Modal>
      <DialogHeader>
        <DialogTitle>팔로워 목록</DialogTitle>
      </DialogHeader>
      <div className="flex w-full flex-col gap-2">
        {followers?.map((follower) => {
          const isFollowing = myFollows?.some(
            (myFollower) => myFollower.followedUserId === follower.userInfo.id
          );
          const isMe = me?.id === follower.userInfo.id;
          const isPending = pendingList[follower.userInfo.id] || false;

          return (
            <FollowUserCard
              key={follower.id}
              isFollowing={!!isFollowing}
              isMe={isMe}
              follower={follower}
              onFollow={(e: MouseEvent) =>
                handleFollow(e, follower.userInfo.id, !!isFollowing)
              }
              isPending={isPending}
              pushUserPage={() => handlePushUserPage(follower.userInfo.id)}
            />
          );
        })}
      </div>
    </Modal>
  );
}
