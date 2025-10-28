"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useMe } from "@/app/_store/use-me";
import { postQueries } from "@/entities/post/api/queries";
import AvatarButtonWithDropDown from "@/app/(playground)/(home)/_components/AvatarButtonWithDropDown";
import EmotionGauge from "@/app/(playground)/(home)/_components/EmotionGauge";

interface Props {
  postId: number;
}

export default function PostHeader({ postId }: Props) {
  const { me } = useMe();
  const { data: post } = useSuspenseQuery(postQueries.getPost(postId, me?.id));

  if (!post) {
    return null;
  }

  const {
    userId,
    userInfo: { userName, avatarUrl, email },
    createdAt,
    emotionLevel,
  } = post;

  const formattedDate = format(new Date(createdAt), "M월 d일 y년", {
    locale: ko,
  });
  const formattedTime = format(new Date(createdAt), "HH:mm");

  return (
    <div className="flex items-center gap-4">
      <AvatarButtonWithDropDown
        userId={userId}
        userName={userName}
        avatarUrl={avatarUrl}
        position="bottomRight"
      />
      <div className="flex flex-col gap-0 self-end">
        <div className="flex items-end gap-1">
          <h3 className="font-medium text-muted-foreground text-xs">
            {userName}
          </h3>
          <span className="text-muted-foreground text-sm">
            · @{email?.split("@")[0]}
          </span>
        </div>
        <p className="text-muted-foreground text-sm">
          {formattedDate} · {formattedTime}
        </p>
      </div>
      <div className="flex h-full flex-1 items-end justify-end p-2">
        <EmotionGauge emotionLevel={emotionLevel} className="h-full" />
      </div>
    </div>
  );
}
