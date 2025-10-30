import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { postQueries } from "@/entities/post";
import { getPostWithProcessing } from "@/entities/post/lib/post-service";

import { createServerClient } from "@/shared/lib/supabase/create-server-client";
import { getQueryClient } from "@/shared/lib/tanstack-query/get-query-client";
import { PostDetail } from "@/widgets/post/ui/post-detail";

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
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(postQueries.getPost(Number(postId)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetail />
    </HydrationBoundary>
  );
}
