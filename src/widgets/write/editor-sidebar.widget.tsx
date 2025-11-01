"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Container } from "@/shared/components/container";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

export const EditorSidebarWidget = () => {
  const router = useRouter();

  return (
    <Container.Sidebar>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-12 w-12"
              onClick={() => router.back()}
            >
              <ArrowLeft className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>글쓰기</p>
          </TooltipContent>
        </Tooltip>
        <div className="flex flex-col items-center gap-2"></div>
      </TooltipProvider>
    </Container.Sidebar>
  );
};
