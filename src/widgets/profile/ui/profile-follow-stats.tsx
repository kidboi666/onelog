"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { countFollowQueries } from "@/entities/follow/api/queries";
import { FollowerListDialog } from "@/features/follow/ui";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/routes/constants";

interface Props {
  userId: string;
}

export function ProfileFollowStats({ userId }: Props) {
  const router = useRouter();
  const [isLoadingFollowing, startFollowingTransition] = useTransition();

  const { data: followerCount } = useSuspenseQuery(
    countFollowQueries.countFollower(userId, true)
  );
  const { data: followingCount } = useSuspenseQuery(
    countFollowQueries.countFollowing(userId, true)
  );

  const pushFollowingList = () => {
    startFollowingTransition(() => {
      router.push(ROUTES.MODAL.FOLLOW.FOLLOWING(userId));
    });
  };

  return (
    <div className="flex gap-4">
      <FollowerListDialog userId={userId}>
        <span className="font-semibold text-lg">{followerCount ?? 0}</span>
        <span className="text-muted-foreground text-xs">팔로워</span>
      </FollowerListDialog>
      <Button
        variant="ghost"
        size="sm"
        onClick={pushFollowingList}
        disabled={isLoadingFollowing}
        className="flex flex-col items-center gap-1 p-2"
      >
        {isLoadingFollowing ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>
            <span className="font-semibold text-lg">{followingCount ?? 0}</span>
            <span className="text-muted-foreground text-xs">팔로잉</span>
          </>
        )}
      </Button>
    </div>
  );
}
