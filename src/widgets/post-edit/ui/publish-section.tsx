"use client";

import { Check, EyeOff, Globe } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { Access } from "@/shared/types/enums";

interface Props {
  accessType: Access;
  onChangeAccessType: (order: Access) => void;
  isSide?: boolean;
}

export function PublishSection({
  onChangeAccessType,
  accessType,
  isSide,
}: Props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="flex h-full items-center gap-2"
    >
      <TooltipProvider>
        <Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-auto p-2">
                  {accessType === Access.PUBLIC ? (
                    <Globe className={isSide ? "h-6 w-6" : "h-4 w-4"} />
                  ) : (
                    <EyeOff className={isSide ? "h-6 w-6" : "h-4 w-4"} />
                  )}
                </Button>
              </TooltipTrigger>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isSide ? "start" : "end"}>
              <DropdownMenuItem
                onClick={() => onChangeAccessType(Access.PUBLIC)}
                className="cursor-pointer gap-2"
              >
                공개
                {accessType === Access.PUBLIC && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onChangeAccessType(Access.PRIVATE)}
                className="cursor-pointer gap-2"
              >
                비공개
                {accessType === Access.PRIVATE && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <TooltipContent side={isSide ? "top" : "bottom"} align="start">
            <p>게시 여부</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
