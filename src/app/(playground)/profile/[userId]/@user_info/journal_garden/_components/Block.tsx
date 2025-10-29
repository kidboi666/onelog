"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { WEEKDAY } from "@/shared/constants/date";
import type { IBlockInfo } from "@/entities/garden/api/dtos";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/tw-merge";

interface BlockProps {
  empty?: boolean;
  className?: string;
  average?: number;
  blockInfo?: IBlockInfo;
  disabled?: boolean;
}

// 감정 농도에 따른 opacity 계산
const colorizeOpacity = (average: number): string => {
  if (average <= 20) return "opacity-20";
  if (average <= 40) return "opacity-40";
  if (average <= 60) return "opacity-60";
  if (average <= 80) return "opacity-80";
  return "opacity-100";
};

export default function Block({
  className,
  empty,
  average,
  blockInfo,
  disabled,
}: BlockProps) {
  const router = useRouter();
  const infoRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const selectedDate = {
    year: Number(searchParams.get("year")),
    month: Number(searchParams.get("month")),
    date: Number(searchParams.get("date")),
  };
  const isSelected =
    selectedDate.year === blockInfo?.year &&
    selectedDate.month === blockInfo?.month &&
    selectedDate.date === blockInfo?.date;

  if (empty) {
    return <div className="size-2.5 select-none opacity-0" />;
  }

  const calculateMonthPoint = (blockInfo: IBlockInfo) => {
    const targetDate = blockInfo.weekDay;
    const calculateMargin = 16 * (targetDate + 1) + 2;
    return calculateMargin;
  };

  const handleBlockClick = () => {
    infoRef.current?.setAttribute("data-status", "closed");

    router.push(
      `?year=${blockInfo?.year}&month=${blockInfo?.month}&date=${blockInfo?.date}`,
    );
  };

  return (
    <div className="relative">
      {blockInfo?.date === 1 && (
        <div
          className="absolute text-nowrap"
          style={{ top: -calculateMonthPoint(blockInfo) }}
        >
          <span className="text-muted-foreground text-xs">
            {`${blockInfo?.month}월`}
          </span>
        </div>
      )}
      <Button
        variant="ghost"
        size="icon"
        onMouseEnter={() =>
          infoRef.current?.setAttribute("data-status", "opened")
        }
        onMouseLeave={() =>
          infoRef.current?.setAttribute("data-status", "closed")
        }
        disabled={disabled}
        onClick={handleBlockClick}
        className={cn(
          "size-3 select-none overflow-hidden rounded-[4px] border border-zinc-300 p-0 shadow-sm active:scale-75 dark:border-zinc-700 dark:shadow-zinc-800",
          className,
        )}
      >
        <div
          className={cn(
            "absolute size-full rounded-[4px]",
            isSelected && "animate-ping ring-2",
          )}
        />
        <div
          className={cn(
            "size-full bg-primary text-center text-[7px] transition-opacity hover:opacity-55",
            average && colorizeOpacity(average),
          )}
        />
      </Button>
      {blockInfo && (
        <div
          ref={infoRef}
          data-status="closed"
          className={cn(
            "absolute z-30 flex h-fit w-fit items-center justify-center text-nowrap rounded-md bg-white p-1 shadow-md transition data-[status=closed]:scale-0 dark:bg-var-darkgray",
            blockInfo.month! > 10
              ? "right-full origin-top-right"
              : "left-full origin-top-left",
            blockInfo.weekDay >= 5 ? "bottom-0" : "top-0",
          )}
        >
          <span className="select-none text-muted-foreground text-xs">
            {`${blockInfo.month} / ${blockInfo.date} / ${WEEKDAY[blockInfo.weekDay]}`}
          </span>
        </div>
      )}
    </div>
  );
}
