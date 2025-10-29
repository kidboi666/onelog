"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { ROUTES } from "@/shared/routes/constants";
import { countFollowQueries } from "@/entities/follow/api/queries";
import { Button } from "@/shared/components/ui/button";

interface Props {
  userId: string;
}

export default function RenderFollowButtonFromProfile({ userId }: Props) {
  const router = useRouter();
  const [isLoadingFollower, startFollowerTransition] = useTransition();
  const [isLoadingFollowing, startFollowingTransition] = useTransition();

  const { data: followerCount } = useSuspenseQuery(
    countFollowQueries.countFollower(userId, true),
  );
  const { data: followingCount } = useSuspenseQuery(
    countFollowQueries.countFollowing(userId, true),
  );

  const pushFollowerList = () => {
    startFollowerTransition(() => {
      router.push(ROUTES.MODAL.FOLLOW.FOLLOWER(userId));
    });
  };

  const pushFollowingList = () => {
    startFollowingTransition(() => {
      router.push(ROUTES.MODAL.FOLLOW.FOLLOWING(userId));
    });
  };

  return (
    <div className="flex gap-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={pushFollowerList}
        disabled={isLoadingFollower}
        className="flex flex-col items-center gap-1 p-2"
      >
        {isLoadingFollower ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>
            <span className="font-semibold text-lg">{followerCount ?? 0}</span>
            <span className="text-muted-foreground text-xs">팔로워</span>
          </>
        )}
      </Button>
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
