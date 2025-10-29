import { format } from "date-fns";
import { ko } from "date-fns/locale";
import AvatarButtonWithDropDown from "@/app/(playground)/(home)/_components/AvatarButtonWithDropDown";
import type { IPost } from "@/entities/post/model/types";
import EmotionGauge from "@/shared/components/emotion-gauge";

interface Props {
  post: IPost;
}

export function PostHeaderInfo({ post }: Props) {
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
