"use client";

import { isServer } from "@tanstack/react-query";
import { Link, Share2 } from "lucide-react";
import { type MouseEvent, useState } from "react";
import { toast } from "sonner";
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

interface Props {
  isSide?: boolean;
  viewToolTip?: boolean;
}

export default function ShareButton({ isSide, viewToolTip }: Props) {
  const [isHover, setIsHover] = useState(false);

  const handleButtonClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const copyURL = async () => {
    const fullURL = !isServer ? window.location.href : "";
    await navigator.clipboard.writeText(fullURL);
    toast.success("URL이 클립보드에 복사되었습니다.");
  };

  const button = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={isSide ? "default" : "icon"}
          onClick={handleButtonClick}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="h-auto p-2 hover:text-green-400 dark:hover:text-green-400"
        >
          <Share2 className={isSide ? "h-6 w-6" : "h-4 w-4"} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={copyURL} className="cursor-pointer gap-2">
          <Link className="h-4 w-4" />
          URL 복사
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (viewToolTip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>
            <p>공유 하기</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
}
