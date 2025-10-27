import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ICreatePost } from "@/entities/post";
import { postApi } from "@/entities/post/api/api";
import {
  POST_QUERY_KEY,
  POST_TOAST_MESSAGE,
} from "@/entities/post/model/constants";
import { getQueryClient } from "@/shared/lib/tanstack-query/get-query-client";

export const useCreatePost = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (params: ICreatePost) => postApi.createPost(params),
    onSuccess: (_, variables) => {
      const queryKeys = [
        POST_QUERY_KEY.PUBLIC,
        POST_QUERY_KEY.GARDEN(variables.meId),
        POST_QUERY_KEY.COUNT.TOTAL(variables.meId),
      ];
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      );

      toast.success(POST_TOAST_MESSAGE.POST.SUCCESS);
    },
    onError: (error) => {
      toast.error(POST_TOAST_MESSAGE.POST.EXCEPTION, {
        description: error.message,
      });
    },
  });
};
