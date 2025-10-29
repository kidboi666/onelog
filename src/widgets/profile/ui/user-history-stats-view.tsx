"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { postCountQueries, postQueries } from "@/entities/post/api/queries";
import { userQuery } from "@/entities/user/api/queries";
import { UserHistoryStats } from "@/entities/user/ui";
import { getSignUpDays } from "@/shared/utils/date";

interface Props {
  userId: string;
  color?: string;
}

export function UserHistoryStatsView({ userId, color }: Props) {
  const { data: user } = useSuspenseQuery(userQuery.getUserInfo(userId));
  const { data: postCount } = useSuspenseQuery(
    postCountQueries.countUserPosts(userId)
  );
  const { data: emotionAverage } = useSuspenseQuery(
    postQueries.getEmotionAverage(userId)
  );

  const signUpDays = getSignUpDays(user?.createdAt ?? "");

  return (
    <UserHistoryStats
      signUpDays={signUpDays}
      postCount={postCount}
      emotionAverage={emotionAverage}
      color={color}
    />
  );
}
