"use client";

import { Flag } from "lucide-react";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { ROUTES } from "@/app/_routes/constants";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/utils/tw-merge";

interface Props {
  postId?: number;
  commentId?: number;
  viewToolTip?: boolean;
  isSide?: boolean;
}

export default function ReportButton({
  viewToolTip,
  postId,
  commentId,
  isSide,
}: Props) {
  const router = useRouter();

  const pushReportModal = (e: MouseEvent) => {
    e.stopPropagation();
    if (commentId) {
      router.push(ROUTES.MODAL.REPORT.COMMENT(commentId), { scroll: false });
    } else {
      router.push(ROUTES.MODAL.REPORT.POST(postId!), { scroll: false });
    }
  };

  const button = (
    <Button
      variant="ghost"
      size={isSide ? "default" : "sm"}
      onClick={pushReportModal}
      className={cn(
        "gap-2 font-light text-xs transition-colors hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/25 dark:hover:text-red-600",
      )}
    >
      <Flag className="size-4" />
    </Button>
  );

  if (viewToolTip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>
            <p>신고하기</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
}
