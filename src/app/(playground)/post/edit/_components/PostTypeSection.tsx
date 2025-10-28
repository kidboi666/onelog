'use client'

import { useState } from 'react'
import { BookHeart, Newspaper, Check } from 'lucide-react'
import { PostType } from "@/shared/types/enums/index"
import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"

interface Props {
  onChangePostType: (postType: PostType) => void
  postType: PostType
  isSide?: boolean
}

export default function PostTypeSection({
  onChangePostType,
  postType,
  isSide,
}: Props) {
  const [isHover, setIsHover] = useState(false)

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
                  {postType === 'journal' ? (
                    <BookHeart className={isSide ? 'h-6 w-6' : 'h-4 w-4'} />
                  ) : (
                    <Newspaper className={isSide ? 'h-6 w-6' : 'h-4 w-4'} />
                  )}
                </Button>
              </TooltipTrigger>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isSide ? 'start' : 'end'}>
              <DropdownMenuItem
                onClick={() => onChangePostType(PostType.JOURNAL)}
                className="gap-2 cursor-pointer"
              >
                감정 일기
                {postType === 'journal' && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onChangePostType(PostType.ARTICLE)}
                className="gap-2 cursor-pointer"
              >
                아티클
                {postType === 'article' && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <TooltipContent side={isSide ? 'top' : 'bottom'} align="start">
            <p>게시물 종류</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
