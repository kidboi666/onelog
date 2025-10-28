'use client'

import { useState } from 'react'
import { Globe, EyeOff, Check } from 'lucide-react'
import { Access } from "@/shared/types/enums/index"
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
  accessType: Access
  onChangeAccessType: (order: Access) => void
  isSide?: boolean
}

export default function PublishSection({
  onChangeAccessType,
  accessType,
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
                  {accessType === Access.PUBLIC ? (
                    <Globe className={isSide ? 'h-6 w-6' : 'h-4 w-4'} />
                  ) : (
                    <EyeOff className={isSide ? 'h-6 w-6' : 'h-4 w-4'} />
                  )}
                </Button>
              </TooltipTrigger>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isSide ? 'start' : 'end'}>
              <DropdownMenuItem
                onClick={() => onChangeAccessType(Access.PUBLIC)}
                className="gap-2 cursor-pointer"
              >
                공개
                {accessType === Access.PUBLIC && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onChangeAccessType(Access.PRIVATE)}
                className="gap-2 cursor-pointer"
              >
                비공개
                {accessType === Access.PRIVATE && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <TooltipContent side={isSide ? 'top' : 'bottom'} align="start">
            <p>게시 여부</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
