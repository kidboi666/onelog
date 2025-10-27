import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { postApi } from "@/entities/post/api/api";
import {
  POST_QUERY_KEY,
  POST_TOAST_MESSAGE,
} from "@/entities/post/model/constants";
import { getQueryClient } from "@/shared/lib/tanstack-query/get-query-client";

export const useDeletePost = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (postId: number) => postApi.deletePost(postId),
    onError: (error) => {
      toast.error(POST_TOAST_MESSAGE.DELETE.EXCEPTION, {
        description: error.message,
      });
    },
    onSettled: (_, __, postId) => {
      const queryKeys = [POST_QUERY_KEY.PUBLIC, POST_QUERY_KEY.DETAIL(postId)];
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      );
      toast.success(POST_TOAST_MESSAGE.DELETE.SUCCESS);
    },
  });
};
