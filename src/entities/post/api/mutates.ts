import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import * as postService from "@/entities/post/lib/post-service";
import { POST_QUERY_KEY, POST_TOAST_MESSAGE } from "@/entities/post/model/constants";
import { getQueryClient } from "@/shared/lib/tanstack-query/get-query-client";

export const useDeletePost = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async (postId: number) => postService.deletePost(postId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: POST_QUERY_KEY.ALL,
      });
      toast.success(POST_TOAST_MESSAGE.DELETE.SUCCESS);
    },
    onError: (error) => {
      toast.error(POST_TOAST_MESSAGE.DELETE.EXCEPTION, {
        description: error.message,
      });
    },
  });
};
