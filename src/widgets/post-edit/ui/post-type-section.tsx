"use client";

import { BookHeart, Check, Newspaper } from "lucide-react";
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
import { PostType } from "@/shared/types/enums";

interface Props {
  onChangePostType: (postType: PostType) => void;
  postType: PostType;
  isSide?: boolean;
}

export function PostTypeSection({
  onChangePostType,
  postType,
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
                  {postType === "journal" ? (
                    <BookHeart className={isSide ? "h-6 w-6" : "h-4 w-4"} />
                  ) : (
                    <Newspaper className={isSide ? "h-6 w-6" : "h-4 w-4"} />
                  )}
                </Button>
              </TooltipTrigger>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isSide ? "start" : "end"}>
              <DropdownMenuItem
                onClick={() => onChangePostType(PostType.JOURNAL)}
                className="cursor-pointer gap-2"
              >
                감정 일기
                {postType === "journal" && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onChangePostType(PostType.ARTICLE)}
                className="cursor-pointer gap-2"
              >
                아티클
                {postType === "article" && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <TooltipContent side={isSide ? "top" : "bottom"} align="start">
            <p>게시물 종류</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
