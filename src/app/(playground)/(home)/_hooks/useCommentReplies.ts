import { useEffect, useState } from "react";
import type { IComment } from "@/entities/comment/model/types";
import { POST_QUERY_KEY } from "@/entities/post/model/constants";
import type { IPostDetail } from "@/entities/post/model/types";
import { getQueryClient } from "@/shared/lib/tanstack-query/get-query-client";
import { sortByDate } from "@/shared/utils/date";

export function useCommentReplies(commentId: number, postId: number) {
  const [replies, setReplies] = useState<IComment[]>([]);

  useEffect(() => {
    if (commentId) {
      const queryClient = getQueryClient();
      const cachedPost = queryClient.getQueryData<IPostDetail>(
        POST_QUERY_KEY.DETAIL(postId),
      );

      if (!cachedPost) return;

      const filteredComments = cachedPost.comments.filter(
        (v) => v.commentId === commentId,
      );
      setReplies(sortByDate(filteredComments));
    }
  }, [commentId, postId]);

  return replies;
}
