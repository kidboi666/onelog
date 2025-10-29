import { cn } from "@/shared/utils/tw-merge";

interface Props {
  title: string;
  content: string | number | null;
  unit: string;
  className?: string;
}

export default function HistoryBlock({
  title,
  content,
  unit,
  className,
}: Props) {
  const isEmotionBlock = title === "평균 감정 농도";

  return (
    <div
      className={cn(
        "flex-1 rounded-lg bg-card p-2 shadow-sm sm:p-4",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-0">
          <h3
            className={cn(
              "font-medium text-muted-foreground text-xs",
              isEmotionBlock && "text-white dark:text-white",
            )}
          >
            {title}
          </h3>
        </div>
        <div
          className={cn(
            "font-bold text-3xl",
            isEmotionBlock && "text-white dark:text-white",
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
