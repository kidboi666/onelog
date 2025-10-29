import { Loader2 } from "lucide-react";
import type { MouseEvent } from "react";
import type { IFollower } from "@/entities/follow/model/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./avatar";
import { Button } from "./button";

interface FollowUserCardProps {
  follower: IFollower;
  onFollow: (e: MouseEvent) => void;
  isFollowing: boolean;
  isMe: boolean;
  pushUserPage: () => void;
  isPending: boolean;
}

export function FollowUserCard({
  follower,
  onFollow,
  isFollowing,
  isMe,
  pushUserPage,
  isPending,
}: FollowUserCardProps) {
  const displayName =
    follower.userInfo.userName ||
    follower.userInfo.email?.split("@")[0] ||
    "익명";

  return (
    <div
      onClick={pushUserPage}
      className="flex w-full cursor-pointer items-center gap-4 rounded-md p-2 hover:bg-muted"
    >
      <Avatar className="size-10">
        <AvatarImage src={follower.userInfo.avatarUrl || undefined} />
        <AvatarFallback>{displayName[0]?.toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col justify-center">
        <p className="font-medium text-sm">{displayName}</p>
        <p className="text-muted-foreground text-xs">
          @{follower.userInfo.email?.split("@")[0]}
        </p>
      </div>
      {!isMe && (
        <Button
          variant={isFollowing ? "secondary" : "default"}
          size="sm"
          disabled={isPending}
          onClick={onFollow}
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : isFollowing ? (
            "팔로우 취소"
          ) : (
            "팔로우 하기"
          )}
        </Button>
      )}
    </div>
  );
}
