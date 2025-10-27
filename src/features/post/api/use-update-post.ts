import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { IUpdatePost } from "@/entities/post";
import { postApi } from "@/entities/post/api/api";
import {
  POST_QUERY_KEY,
  POST_TOAST_MESSAGE,
} from "@/entities/post/model/constants";
import { getQueryClient } from "@/shared/lib/tanstack-query/get-query-client";
import { PostType } from "@/shared/types/enums";

export const useUpdatePost = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async (params: IUpdatePost) => postApi.updatePost(params),
    onSuccess: (_, variables) => {
      const { id, meId } = variables;
      const queryKeys = [
        POST_QUERY_KEY.PUBLIC,
        POST_QUERY_KEY.DETAIL(id),
        POST_QUERY_KEY.POST_TYPE(PostType.ARTICLE, meId),
        POST_QUERY_KEY.POST_TYPE(PostType.JOURNAL, meId),
      ];
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      );

      toast.success(POST_TOAST_MESSAGE.UPDATE.SUCCESS);
    },
    onError: (error) => {
      toast.error(POST_TOAST_MESSAGE.UPDATE.EXCEPTION, {
        description: error.message,
      });
    },
  });
};
