"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { postCountQuery, postQueries } from "@/entities/post/api/queries";
import { userQuery } from "@/entities/user/api/queries";
import { getSignUpDays } from "@/shared/utils/date";
import HistoryBlock from "./HistoryBlock";

interface Props {
  userId: string;
  color?: string;
}

export default function AuthHistory({ userId, color }: Props) {
  const { data: user } = useSuspenseQuery(userQuery.getUserInfo(userId));
  const { data: postLength } = useSuspenseQuery(
    postCountQuery.countUserPosts(userId),
  );
  const { data: myAverageEmotion } = useSuspenseQuery(
    postQueries.getEmotionAverage(userId),
  );

  const getColorClass = () => {
    switch (color) {
      case "blue":
        return "bg-var-blue";
      case "orange":
        return "bg-var-orange";
      case "yellow":
        return "bg-var-yellow";
      case "green":
        return "bg-var-green";
      case "black":
        return "bg-var-black dark:bg-white";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex gap-2 sm:gap-8">
        <HistoryBlock
          title="시작한지"
          content={getSignUpDays(user?.createdAt ?? "")}
          unit="일 째"
        />
        <HistoryBlock title="기록" content={postLength} unit="개" />
        <HistoryBlock
          title="평균 감정 농도"
          content={myAverageEmotion}
          className={getColorClass()}
          unit="%"
        />
      </div>
    </div>
  );
}
