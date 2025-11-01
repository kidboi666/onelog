"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  EMOTION_STATUS,
  type EmotionLevel,
} from "@/entities/article/article.model";
import { ArticleAccessTypeButton } from "@/entities/article/ui/article-access-type-button";
import { ArticleEmotionButton } from "@/entities/article/ui/article-emotion-button";
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
  const [emotionLevel, setEmotionLevel] = useState<EmotionLevel | null>(null);
  const computedAccessTypeValue = isPublic ? "public" : "private";

  const handlePublicChange = (value: string) => {
    setIsPublic(value === "public");
  };

  const handleEmotionChange = (value: string) => {
    setEmotionLevel(() => {
      switch (value) {
        case "0":
          return 0;
        case "25":
          return 25;
        case "50":
          return 50;
        case "75":
          return 75;
        case "100":
          return 100;
        default:
          return null;
      }
    });
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
        <ArticleEmotionButton
          value={emotionLevel}
          onValueChange={handleEmotionChange}
        />
      </Container.Sidebar>
    </TooltipProvider>
  );
};
