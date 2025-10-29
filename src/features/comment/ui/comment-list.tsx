"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useMe } from "@/app/_store/use-me";
import { postQueries } from "@/entities/post/api/queries";
import { CommentInput } from "./comment-input";
import { CommentItem } from "./comment-item";

interface Props {
  postId: number;
}

// 날짜순 정렬 함수
function sortByDate<T extends { createdAt: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function CommentList({ postId }: Props) {
  const { me } = useMe();
  const { data: post } = useSuspenseQuery(postQueries.getPost(postId, me?.id));

  const comments = useMemo(() => {
    if (!post || post.comments.length === 0) {
      return [];
    }
    return sortByDate(post.comments);
  }, [post]);

  return (
    <div className="flex flex-col gap-4">
      <CommentInput postId={postId} me={me} />
      {comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <p className="text-sm">아직 달린 댓글이 없습니다.</p>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-4">
          {comments.map((comment) => {
            if (comment.commentId) return null;

            return (
              <CommentItem
                key={comment.id}
                comment={comment}
                postId={postId}
                me={me}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
