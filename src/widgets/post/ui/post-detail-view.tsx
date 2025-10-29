"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMe } from "@/app/_store/use-me";
import { postQueries } from "@/entities/post/api/queries";
import {
  PostAuthorCard,
  PostContent,
  PostHeaderInfo,
} from "@/entities/post/ui";
import { PostActionBar, RenderCommentFromPost } from "@/features/post";
import { Separator } from "@/shared/components/ui/separator";

interface Props {
  postId: number;
}

export function PostDetailView({ postId }: Props) {
  const { me } = useMe();
  const { data: post } = useSuspenseQuery(postQueries.getPost(postId, me?.id));

  if (!post) {
    return null;
  }

  return (
    <div className="flex flex-1 animate-fade-in flex-col gap-8">
      <div className="flex flex-col gap-0 rounded-md bg-card p-2 shadow-sm sm:gap-4 sm:p-4">
        <PostHeaderInfo post={post} />
        <Separator />
        <PostContent post={post} />
        <PostAuthorCard post={post} />
        <PostActionBar postId={postId} />
      </div>
      <RenderCommentFromPost postId={postId} />
    </div>
  );
}
