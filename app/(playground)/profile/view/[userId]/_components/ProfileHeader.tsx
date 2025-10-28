"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { userQuery } from "@/entities/user/api/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import EmotionAverage from "./EmotionAverage";

interface Props {
  userId: string;
  color?: string;
}

export default function ProfileHeader({ userId, color }: Props) {
  const { data: user } = useSuspenseQuery(userQuery.getUserInfo(userId));
  const displayName = user?.userName || user?.email?.split("@")[0] || "익명";

  return (
    <>
      <div className="relative">
        <Avatar className="size-20 ring-2 ring-border shadow-sm">
          <AvatarImage src={user?.avatarUrl || undefined} alt={displayName} />
          <AvatarFallback className="text-lg">
            {displayName[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <EmotionAverage userId={userId} color={color} />
      </div>
      <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-end sm:gap-2">
        <h1 className="font-bold text-2xl">{user?.userName}</h1>
        <span className="text-muted-foreground text-sm">{user?.email}</span>
      </div>
    </>
  );
}
