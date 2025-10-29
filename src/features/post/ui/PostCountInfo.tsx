"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMe } from "@/app/_store/use-me";
import CommentButton from "@/app/(playground)/(home)/_components/CommentButton";
import LikeButton from "@/app/(playground)/(home)/_components/LikeButton";
import { postQueries } from "@/entities/post/api/queries";

interface Props {
  postId: number;
}

export function PostCountInfo({ postId }: Props) {
  const { me } = useMe();
  const { data: post } = useSuspenseQuery(postQueries.getPost(postId, me?.id));

  if (!post) {
    return null;
  }

  const { likeCount, isLiked, commentCount } = post;

  return (
    <>
      <LikeButton
        likeCount={likeCount[0].count}
        isLike={isLiked.length > 0}
        postId={postId}
        viewToolTip
        isSide
      />
      <CommentButton commentCount={commentCount[0].count} viewToolTip isSide />
    </>
  );
}
