"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMe } from "@/app/_store/use-me";
import { CommentButton } from "@/features/comment";
import { postQueries } from "@/entities/post/api/queries";
import { Separator } from "@/shared/components/ui/separator";
import { AccessTypeSelector } from "./access-type-selector";
import { LikeButton } from "./like-button";
import { PostOptionsMenu } from "./post-options-menu";
import { ReportButton } from "./report-button";
import { ShareButton } from "./share-button";

interface Props {
  postId: number;
}

export function PostActionBar({ postId }: Props) {
  const { me } = useMe();
  const { data: post } = useSuspenseQuery(postQueries.getPost(postId, me?.id));

  if (!post) {
    return null;
  }

  const { isLiked, likeCount, commentCount, accessType } = post;

  return (
    <div className="flex flex-col sm:hidden">
      <Separator />
      <div className="flex items-center justify-between">
        <LikeButton
          isLike={isLiked.length >= 1}
          likeCount={likeCount[0].count}
          postId={postId}
          viewToolTip
        />
        <CommentButton viewToolTip commentCount={commentCount[0].count} />
        <AccessTypeSelector accessType={accessType} viewToolTip />
        <ShareButton viewToolTip />
        <ReportButton viewToolTip postId={postId} />
        <PostOptionsMenu type="post" postId={post.id} />
      </div>
    </div>
  );
}
