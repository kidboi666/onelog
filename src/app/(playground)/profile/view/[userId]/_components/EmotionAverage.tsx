"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { emotionQuery } from "@/entities/garden/api/queries";
import { cn } from "@/shared/utils/tw-merge";

interface Props {
  userId: string;
  color?: string;
}

export default function EmotionAverage({ userId, color }: Props) {
  const { data: myAverageEmotion } = useSuspenseQuery(
    emotionQuery.getEmotionAverage(userId)
  );

  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return "bg-var-blue text-white ring-var-blue/65";
      case "orange":
        return "bg-var-orange text-white ring-var-orange/65";
      case "yellow":
        return "bg-var-yellow text-white ring-var-yellow/65";
      case "green":
        return "bg-var-green text-white ring-var-green/65";
      case "black":
        return "bg-var-black text-white ring-var-black/65 dark:ring-white/65";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  return (
    <div className="absolute -right-3 top-0">
      <span
        className={cn(
          "animate-cta-fadein-out rounded-lg px-1.5 py-1 text-xs font-semibold",
          getColorClasses()
        )}
      >
        {myAverageEmotion}%
      </span>
    </div>
  );
}
