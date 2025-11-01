"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArticleAccessTypeButton } from "@/entities/article/ui/article-access-type-button";
import { Container } from "@/shared/components/container";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

export const EditorSidebar = () => {
  const router = useRouter();
  const [isPublic, setIsPublic] = useState(true);
  const computedAccessTypeValue = isPublic ? "public" : "private";

  const handlePublicChange = (value: string) => {
    setIsPublic(value === "public");
  };

  return (
    <TooltipProvider>
      <Container.Sidebar>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">뒤로 가기</TooltipContent>
        </Tooltip>
        <Separator />
        <ArticleAccessTypeButton
          value={computedAccessTypeValue}
          onValueChange={handlePublicChange}
        />
      </Container.Sidebar>
    </TooltipProvider>
  );
};
