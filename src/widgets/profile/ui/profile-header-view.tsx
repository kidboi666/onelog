"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { postQueries } from "@/entities/post/api/queries";
import { userQuery } from "@/entities/user/api/queries";
import { UserEmotionBadge, UserProfileHeader } from "@/entities/user/ui";

interface Props {
  userId: string;
  color?: string;
}

export function ProfileHeaderView({ userId, color }: Props) {
  const { data: user } = useSuspenseQuery(userQuery.getUserInfo(userId));
  const { data: emotionAverage } = useSuspenseQuery(
    postQueries.getEmotionAverage(userId)
  );

  if (!user) return null;

  return (
    <UserProfileHeader
      user={user}
      emotionBadge={
        <UserEmotionBadge emotionAverage={emotionAverage} color={color} />
      }
    />
  );
}
