import Link from "next/link";
import { useTransition } from "react";
import useFollowMutates from "@/hooks/mutates/useFollowMutates";
import useFollowQueries from "@/hooks/queries/useFollowQueries";
import { ROUTES } from "@/shared/routes/constants";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";

interface Props {
  avatarUrl: string | null;
  userName: string | null;
  userId: string;
}

export default function AvatarButtonWithDropDownContent({
  userId,
  userName,
  avatarUrl,
}: Props) {
  const [isLoadingFollowing, startTransitionFollowing] = useTransition();
  const [isLoadingFollower, startTransitionFollower] = useTransition();
  const [isLoadingFollowingList, startTransitionFollowingList] =
    useTransition();
  const { followingCount, followerCount, isFollowing, isMe } =
    useFollowQueries(userId);
  const { onFollow, pushFollowingList, pushFollowerList } = useFollowMutates({
    isFollowing,
    userId,
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={avatarUrl ?? undefined} alt={userName ?? "User"} />
          <AvatarFallback>
            {userName?.charAt(0).toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-sm">{userName}</h3>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="sm"
            disabled={isLoadingFollower}
            onClick={() => startTransitionFollower(() => pushFollowerList())}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-muted-foreground text-xs">팔로워</span>
            <span className="font-semibold">{followerCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={isLoadingFollowingList}
            onClick={() =>
              startTransitionFollowingList(() => pushFollowingList())
            }
            className="flex flex-col items-center gap-1"
          >
            <span className="text-muted-foreground text-xs">팔로잉</span>
            <span className="font-semibold">{followingCount}</span>
          </Button>
        </div>
        <div className="flex gap-4">
          {isMe ? (
            <>
              <Button variant="secondary" size="sm" asChild>
                <Link href={ROUTES.PROFILE.EDIT}>프로필 수정</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={ROUTES.PROFILE.VIEW(userId)}>마이 페이지</Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                size="sm"
                disabled={isLoadingFollowing}
                onClick={() => startTransitionFollowing(() => onFollow())}
              >
                {isFollowing ? "팔로우 취소" : "팔로우 하기"}
              </Button>
              <Button size="sm" asChild>
                <Link href={ROUTES.PROFILE.VIEW(userId)}>프로필 페이지</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
