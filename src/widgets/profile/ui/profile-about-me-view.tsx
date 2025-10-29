"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { userQuery } from "@/entities/user/api/queries";
import { UserAboutMe } from "@/entities/user/ui";

interface Props {
  userId: string;
}

export function ProfileAboutMeView({ userId }: Props) {
  const { data: user } = useSuspenseQuery(userQuery.getUserInfo(userId));

  if (!user) return null;

  return <UserAboutMe user={user} />;
}
