import { cn } from "@/shared/utils/tw-merge";

interface HistoryBlockData {
  title: string;
  content: string | number | null;
  unit: string;
  className?: string;
}

interface Props {
  signUpDays: string | number;
  postCount: number;
  emotionAverage: number;
  color?: string;
}

export function UserHistoryStats({
  signUpDays,
  postCount,
  emotionAverage,
  color,
}: Props) {
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

  const historyBlocks: HistoryBlockData[] = [
    {
      title: "시작한지",
      content: signUpDays,
      unit: "일 째",
    },
    {
      title: "기록",
      content: postCount,
      unit: "개",
    },
    {
      title: "평균 감정 농도",
      content: emotionAverage,
      className: getColorClass(),
      unit: "%",
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex gap-2 sm:gap-8">
        {historyBlocks.map((block) => (
          <HistoryBlock key={block.title} {...block} />
        ))}
      </div>
    </div>
  );
}

function HistoryBlock({ title, content, unit, className }: HistoryBlockData) {
  const isEmotionBlock = title === "평균 감정 농도";

  return (
    <div
      className={cn(
        "flex-1 rounded-lg bg-card p-2 shadow-sm sm:p-4",
        className
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-0">
          <h3
            className={cn(
              "font-medium text-muted-foreground text-xs",
              isEmotionBlock && "text-white dark:text-white"
            )}
          >
            {title}
          </h3>
        </div>
        <div
          className={cn(
            "font-bold text-3xl",
            isEmotionBlock && "text-white dark:text-white"
          )}
        >
          {content}
          <span className={cn(isEmotionBlock && "text-white dark:text-white")}>
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
}
