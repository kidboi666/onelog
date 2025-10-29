import type { Metadata } from "next";
import { getPostWithProcessing } from "@/entities/post/lib/post-service";
import { createServerClient } from "@/shared/lib/supabase/create-server-client";
import { PostDetailSidebar, PostDetailView } from "@/widgets/post";

interface Props {
  params: Promise<{ postId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postId } = await params;
  const supabase = await createServerClient();
  const post = await getPostWithProcessing(
    { postId: Number(postId) },
    supabase,
  );

  return {
    title: post?.title ?? `${post?.userInfo.userName} 님의 글`,
  };
}

export default async function PostPage({ params }: Props) {
  const { postId } = await params;
  const postIdNum = Number(postId);

  return (
    <div className="flex gap-4">
      <PostDetailView postId={postIdNum} />
      <PostDetailSidebar postId={postIdNum} />
    </div>
  );
}
