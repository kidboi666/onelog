"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import type { MouseEvent, ReactNode } from "react";
import { useState } from "react";
import { useMe } from "@/app/_store/use-me";
import { useHandleFollow } from "@/entities/follow/api/mutates";
import { followQueries } from "@/entities/follow/api/queries";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { FollowUserCard } from "@/shared/components/ui/FollowUserCard";

interface FollowingListDialogProps {
  userId: string;
  children: ReactNode;
  onUserClick?: (userId: string) => void;
  onAuthRequired?: () => void;
}

export function FollowingListDialog({
  userId,
  children,
  onUserClick,
  onAuthRequired,
}: FollowingListDialogProps) {
  const { me } = useMe();
  const { data: followings } = useSuspenseQuery(
    followQueries.getFollowing(userId),
  );
  const { data: myFollows } = useSuspenseQuery(
    followQueries.getFollowing(me?.id || ""),
  );
  const { mutate: followOrUnfollow } = useHandleFollow();
  const [pendingList, setPendingList] = useState<Record<string, boolean>>({});

  const handleFollow = (
    e: MouseEvent,
    targetUserId: string,
    isFollowing: boolean,
  ) => {
    e.stopPropagation();
    if (!me) {
      onAuthRequired?.();
      return;
    }

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
    onUserClick?.(targetUserId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
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
      </DialogContent>
    </Dialog>
  );
}
