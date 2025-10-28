import { getPost } from "@/entities/post/api/post-api";
import { createServerClient } from "@/shared/lib/supabase/create-server-client";
import { Separator } from "@/shared/components/ui/separator";
import PostActionBar from "./_components/PostActionBar";
import PostAuthorInfo from "./_components/PostAuthorInfo";
import PostBody from "./_components/PostBody";
import PostHeader from "./_components/PostHeader";
import RenderCommentFromPost from "./_components/RenderCommentFromPost";

interface Props {
  params: { postId: string };
}

export async function generateMetadata({ params: { postId } }: Props) {
  const supabase = createServerClient();
  const post = await getPost({ postId: Number(postId) }, supabase);

  return {
    title: post?.title ?? `${post?.userInfo.userName}님의 글`,
  };
}

export default async function PostPage({ params: { postId } }: Props) {
  return (
    <>
      <div className="flex flex-1 animate-fade-in flex-col gap-8">
        <div className="flex flex-col gap-0 rounded-md bg-white p-2 shadow-sm sm:gap-4 sm:p-4 dark:bg-var-darkgray">
          <PostHeader postId={Number(postId)} />
          <Separator />
          <PostBody postId={Number(postId)} />
          <PostAuthorInfo postId={Number(postId)} />
          <PostActionBar postId={Number(postId)} />
        </div>
        <RenderCommentFromPost postId={Number(postId)} />
      </div>
    </>
  );
}
