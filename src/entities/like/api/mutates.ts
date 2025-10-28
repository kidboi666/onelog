import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import * as likeService from "@/entities/like/lib/like-service";
import { LIKE_TOAST_MESSAGE } from "@/entities/like/model/constants";
import type { ILike } from "@/entities/like/model/types";
import { POST_QUERY_KEY } from "@/entities/post/model/constants";
import { getQueryClient } from "@/shared/lib/tanstack-query/get-query-client";

export const useHandleLikePost = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async (params: ILike) => likeService.handleLike(params),
    onSuccess: (_, variables) => {
      const { isLike } = variables;
      toast.success(
        isLike
          ? LIKE_TOAST_MESSAGE.CANCEL.SUCCESS
          : LIKE_TOAST_MESSAGE.SEND.SUCCESS,
      );
    },
    onError: (error, variables) => {
      const { isLike } = variables;
      toast.error(
        isLike
          ? LIKE_TOAST_MESSAGE.CANCEL.EXCEPTION
          : LIKE_TOAST_MESSAGE.SEND.EXCEPTION,
        { description: error.message },
      );
    },
    onSettled: (_, __, variables) => {
      const {
        postId,
        meId,
        authorId,
        postType,
        startOfDay = null,
        endOfDay = null,
      } = variables;

      const queryKeys = [
        POST_QUERY_KEY.PUBLIC,
        POST_QUERY_KEY.LIKED(authorId, meId),
        POST_QUERY_KEY.THAT_DAY(startOfDay, endOfDay, authorId),
        POST_QUERY_KEY.DETAIL(postId),
        POST_QUERY_KEY.POST_TYPE(postType, authorId),
        POST_QUERY_KEY.CHECK_LIKED(postId, meId),
      ];
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      );
    },
  });
};
