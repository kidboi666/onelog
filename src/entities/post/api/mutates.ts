import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ICreatePost, IUpdatePost } from "@/entities/post/api/dtos";
import {
  createPost,
  deletePost,
  updatePost,
} from "@/entities/post/api/post-api";
import {
  POST_QUERY_KEY,
  POST_TOAST_MESSAGE,
} from "@/entities/post/model/constants";
import { getQueryClient } from "@/shared/lib/tanstack-query/get-query-client";
import { PostType } from "@/shared/types/enums";

export const useCreatePost = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (params: ICreatePost) => createPost(params),
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

export const useDeletePost = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),
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

export const useUpdatePost = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async (params: IUpdatePost) => updatePost(params),
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
