import type { Metadata } from "next";
import { getPostWithProcessing } from "@/entities/post/lib/post-service";
import { Separator } from "@/shared/components/ui/separator";
import { createServerClient } from "@/shared/lib/supabase/create-server-client";
import PostActionBar from "./_components/PostActionBar";
import PostAuthorInfo from "./_components/PostAuthorInfo";
import PostBody from "./_components/PostBody";
import PostCountInfo from "./_components/PostCountInfo";
import PostHeader from "./_components/PostHeader";
import RenderCommentFromPost from "./_components/RenderCommentFromPost";
import SideActionBar from "./_components/SideActionBar";

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
    title: post?.title ?? `${post?.userInfo.userName}님의 글`,
  };
}

export default async function PostPage({ params }: Props) {
  const { postId } = await params;
  const postIdNum = Number(postId);

  return (
    <div className="flex gap-4">
      {/* Main Content */}
      <div className="flex flex-1 animate-fade-in flex-col gap-8">
        <div className="flex flex-col gap-0 rounded-md bg-white p-2 shadow-sm sm:gap-4 sm:p-4 dark:bg-var-darkgray">
          <PostHeader postId={postIdNum} />
          <Separator />
          <PostBody postId={postIdNum} />
          <PostAuthorInfo postId={postIdNum} />
          <PostActionBar postId={postIdNum} />
        </div>
        <RenderCommentFromPost postId={postIdNum} />
      </div>

      {/* Side Menu */}
      <div className="sticky top-8 left-4 hidden h-fit animate-fade-in-reverse rounded-md bg-white p-2 shadow-md max-lg:fixed sm:flex dark:bg-var-darkgray">
        <nav className="flex flex-col items-center">
          <PostCountInfo postId={postIdNum} />
          <Separator className="w-full" />
          <SideActionBar postId={postIdNum} />
        </nav>
      </div>
    </div>
  );
}
