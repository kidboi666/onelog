import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createComment,
  deleteComment,
  updateComment,
} from "@/entities/comment/api/comment-api";
import type {
  ICreateComment,
  IDeleteComment,
  IUpdateComment,
} from "@/entities/comment/api/dtos";
import { COMMENT_TOAST_MESSAGE } from "@/entities/comment/model/constants";
import { POST_QUERY_KEY } from "@/entities/post/model/constants";
import { getQueryClient } from "@/shared/lib/tanstack-query/get-query-client";

export const useDeleteComment = () => {
  const queryClient = getQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (params: IDeleteComment) =>
      deleteComment(params.commentId),
    onError: (error) => {
      toast.error(COMMENT_TOAST_MESSAGE.DELETE.EXCEPTION, {
        description: error.message,
      });
    },
    onSettled: (data, error, variables, context) => {
      const { postId } = variables;
      void queryClient.invalidateQueries({
        queryKey: POST_QUERY_KEY.DETAIL(postId),
      });
      toast.success(COMMENT_TOAST_MESSAGE.DELETE.SUCCESS);
      router.back();
    },
  });
};

export const usePostComment = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (params: ICreateComment) => createComment(params),
    onSuccess: (_, variables) => {
      const { postId } = variables;
      void queryClient.invalidateQueries({
        queryKey: POST_QUERY_KEY.DETAIL(postId),
      });

      toast.success(COMMENT_TOAST_MESSAGE.POST.SUCCESS);
    },
    onError: (error) => {
      toast.error(COMMENT_TOAST_MESSAGE.POST.EXCEPTION, {
        description: error.message,
      });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (params: IUpdateComment) => updateComment(params),
    onSuccess: (_, variables) => {
      const { postId } = variables;
      void queryClient.invalidateQueries({
        queryKey: POST_QUERY_KEY.DETAIL(postId),
      });

      toast.success(COMMENT_TOAST_MESSAGE.UPDATE.SUCCESS);
    },
    onError: (error) => {
      toast.error(COMMENT_TOAST_MESSAGE.UPDATE.EXCEPTION, {
        description: error.message,
      });
    },
  });
};
