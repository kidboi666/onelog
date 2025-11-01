"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent, useState } from "react";
import type {
  AccessType,
  EmotionLevel,
} from "@/entities/article/article.model";
import { Container } from "@/shared/components/container";
import { Separator } from "@/shared/components/ui/separator";
import { useMe } from "@/shared/store/use-me";
import { WriteBodyHeader } from "@/widgets/write/write-body-header.widget";
import { WriteForm } from "@/widgets/write/write-form.widget";
import { WritePageHeader } from "@/widgets/write/write-page-header.widget";
import { WritePageSidebar } from "@/widgets/write/write-page-sidebar.widget";

const Page = () => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [accessType, setAccessType] = useState<AccessType>("public");
  const [emotionLevel, setEmotionLevel] = useState<EmotionLevel>(50);
  const { me } = useMe();
  const handleAccessTypeChange = (value: string) => {
    setAccessType(value as AccessType);
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
          return 50;
      }
    });
  };

  const handleSubmit = () => {
    // TODO
  };

  const handleValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  return (
    <>
      <WritePageSidebar
        content={content}
        userId={me?.id}
        emotionLevel={emotionLevel}
        accessType={accessType}
        onAccessTypeChange={handleAccessTypeChange}
        onEmotionChange={handleEmotionChange}
        onBack={() => router.back()}
      />
      <WritePageHeader
        emotionLevel={emotionLevel}
        accessType={accessType}
        onAccessTypeChange={handleAccessTypeChange}
        onEmotionChange={handleEmotionChange}
        onBack={() => router.back()}
      />
      <Container.Body variant="write">
        <WriteBodyHeader
          avatarUrl={me?.avatarUrl}
          userName={me?.userName}
          email={me?.email}
          createdAt={me?.createdAt}
          emotionLevel={emotionLevel}
        />
        <Separator />
        <WriteForm value={content} onValueChange={handleValueChange} />
      </Container.Body>
    </>
  );
};

export default Page;
