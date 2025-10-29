import type { IUserInfo } from "@/entities/user/model/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import type { ReactNode } from "react";

interface Props {
  user: IUserInfo;
  emotionBadge?: ReactNode;
}

export function UserProfileHeader({ user, emotionBadge }: Props) {
  const displayName = user?.userName || user?.email?.split("@")[0] || "익명";

  return (
    <>
      <div className="relative">
        <Avatar className="size-20 shadow-sm ring-2 ring-border">
          <AvatarImage src={user?.avatarUrl || undefined} alt={displayName} />
          <AvatarFallback className="text-lg">
            {displayName[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {emotionBadge}
      </div>
      <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-end sm:gap-2">
        <h1 className="font-bold text-2xl">{user?.userName}</h1>
        <span className="text-muted-foreground text-sm">{user?.email}</span>
      </div>
    </>
  );
}
