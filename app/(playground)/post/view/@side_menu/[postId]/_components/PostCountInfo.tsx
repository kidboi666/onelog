"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMe } from "@/app/store/use-me";
import { postQueries } from "@/entities/post/api/queries";
import CommentButton from "../../../../../(home)/_components/CommentButton";
import LikeButton from "../../../../../(home)/_components/LikeButton";

interface Props {
  postId: number;
}

export default function PostCountInfo({ postId }: Props) {
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
