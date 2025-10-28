"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/_routes/constants";
import { useMe } from "@/app/_store/use-me";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Card } from "@/shared/components/ui/card";

export default function FakeFormContainer() {
  const router = useRouter();
  const { me } = useMe();

  const pushNewPost = () => router.push(ROUTES.POST.NEW);
  const authGuard = () => router.push(ROUTES.MODAL.AUTH.GUARD);

  const handlePostClick = () => {
    me ? pushNewPost() : authGuard();
  };

  return (
    <Card
      className="flex cursor-pointer gap-4 p-4 transition-colors hover:bg-accent"
      onClick={handlePostClick}
    >
      <Avatar className="hidden size-10 sm:flex">
        <AvatarImage src={me?.avatarUrl || undefined} />
        <AvatarFallback>
          {me?.userName?.[0]?.toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-1 items-center rounded-md bg-muted/50 p-3 text-muted-foreground text-sm">
        오늘 당신의 생각을 한 줄로 기록하세요.
      </div>
    </Card>
  );
}
