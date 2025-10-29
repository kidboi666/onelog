"use client";

import { Check, Smile, SmilePlus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import type { EmotionLevel } from "@/shared/types/enums";
import { cn } from "@/shared/utils/tw-merge";
import { EMOTION_STATUS } from "../model/constants";

interface Props {
  onChangeEmotion: (emotion: EmotionLevel | null) => void;
  selectedEmotion: EmotionLevel | null;
  isSide?: boolean;
}

const emotionLabels: Record<EmotionLevel, string> = {
  0: "매우나쁨",
  25: "나쁨",
  50: "보통",
  75: "좋음",
  100: "매우좋음",
};

export function EmotionSection({
  selectedEmotion,
  onChangeEmotion,
  isSide,
}: Props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative flex h-full items-center justify-start"
    >
      <TooltipProvider>
        <Tooltip>
          <Popover>
            <PopoverTrigger asChild>
              <TooltipTrigger asChild>
                <div className="relative flex flex-col items-center gap-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-auto flex-col p-2"
                  >
                    {selectedEmotion && (
                      <p className="absolute top-0 text-muted-foreground text-xs">
                        {emotionLabels[selectedEmotion]}
                      </p>
                    )}
                    {selectedEmotion ? (
                      <SmilePlus className={isSide ? "h-6 w-6" : "h-4 w-4"} />
                    ) : (
                      <Smile className={isSide ? "h-6 w-6" : "h-4 w-4"} />
                    )}
                  </Button>
                </div>
              </TooltipTrigger>
            </PopoverTrigger>
            <PopoverContent
              align={isSide ? "start" : "end"}
              className="w-auto p-2"
            >
              <div className="flex flex-col items-start justify-between gap-2">
                {EMOTION_STATUS.map((emotion, index) => {
                  let blockOpacity: string;
                  switch (index) {
                    case 0:
                      blockOpacity = "opacity-20";
                      break;
                    case 1:
                      blockOpacity = "opacity-40";
                      break;
                    case 2:
                      blockOpacity = "opacity-60";
                      break;
                    case 3:
                      blockOpacity = "opacity-80";
                      break;
                    case 4:
                      blockOpacity = "opacity-100";
                      break;
                    default:
                      blockOpacity = "opacity-100";
                      break;
                  }

                  return (
                    <button
                      key={emotion.status}
                      onClick={() => onChangeEmotion(emotion.percent)}
                      className="relative flex cursor-pointer justify-center rounded-md p-2 hover:bg-accent"
                    >
                      <div className="relative flex flex-col gap-2 font-medium text-zinc-400">
                        <div
                          className={cn(
                            "flex size-6 items-center justify-center rounded-full bg-primary transition",
                            blockOpacity,
                          )}
                        />
                        {selectedEmotion === emotion.percent && (
                          <Check className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-4 w-4 text-white" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
          <TooltipContent side={isSide ? "top" : "bottom"} align="start">
            <p>감정 농도 선택</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
