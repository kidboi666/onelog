"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { userQuery } from "@/entities/user/api/queries";

interface Props {
  userId: string;
}

export default function ProfileAboutMe({ userId }: Props) {
  const { data: user } = useSuspenseQuery(userQuery.getUserInfo(userId));

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-foreground">
        {user?.aboutMe ?? "자기 소개를 작성해주세요."}
      </p>
    </div>
  );
}
