"use client";

import type { EmotionLevel } from "@/shared/constants";
import { cn } from "@/shared/lib/utils";

interface Props {
  emotionLevel: EmotionLevel | null;
  onClick?: () => void;
  className?: string;
}

const emotionColors: Record<EmotionLevel, string> = {
  0: "bg-gray-300",
  25: "bg-blue-400",
  50: "bg-green-400",
  75: "bg-yellow-400",
  100: "bg-red-400",
};

const emotionLabels: Record<EmotionLevel, string> = {
  0: "매우 나쁨",
  25: "나쁨",
  50: "보통",
  75: "좋음",
  100: "매우 좋음",
};

export const EmotionGauge = ({ emotionLevel, onClick, className }: Props) => {
  if (emotionLevel === null) return null;

  const percentage = emotionLevel;
  const colorClass = emotionColors[emotionLevel];
  const label = emotionLabels[emotionLevel];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        "flex flex-col items-center gap-2 rounded-md p-2",
        onClick && "cursor-pointer hover:bg-accent",
        !onClick && "cursor-default",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-xs">{label}</span>
      </div>
      <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={cn("h-full transition-all", colorClass)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </button>
  );
};
