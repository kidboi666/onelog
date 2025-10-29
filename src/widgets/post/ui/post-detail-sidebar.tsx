"use client";

import { PostCountInfo, SideActionBar } from "@/features/post";
import { Separator } from "@/shared/components/ui/separator";

interface Props {
  postId: number;
}

export function PostDetailSidebar({ postId }: Props) {
  return (
    <div className="sticky top-8 left-4 hidden h-fit animate-fade-in-reverse rounded-md bg-card p-2 shadow-md max-lg:fixed sm:flex">
      <nav className="flex flex-col items-center">
        <PostCountInfo postId={postId} />
        <Separator className="w-full" />
        <SideActionBar postId={postId} />
      </nav>
    </div>
  );
}
