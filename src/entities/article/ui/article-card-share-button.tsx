"use client";

import { Link, Share2 } from "lucide-react";
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
  onClick: () => Promise<void>;
}

export function ArticleCardShareButton({ onClick }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-auto p-2 hover:text-green-400 dark:hover:text-green-400"
              >
                <Share2 className="h-4 w-4 md:h-6 md:w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={onClick}
                className="cursor-pointer gap-2"
              >
                <Link className="h-4 w-4" />
                URL 복사
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent>
          <p>공유 하기</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
