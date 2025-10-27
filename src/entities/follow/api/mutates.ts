import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { IHandleFollow } from "@/entities/follow/api/dtos";
import { createFollow, deleteFollow } from "@/entities/follow/api/follow-api";
import {
  FOLLOW_QUERY_KEY,
  FOLLOW_TOAST_MESSAGE,
} from "@/entities/follow/model/constants";
import { getQueryClient } from "@/shared/lib/tanstack-query/get-query-client";

export const useHandleFollow = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async (params: IHandleFollow) => {
      const { isFollowing, followedUserId, followerUserId } = params;
      let result = null;
      if (isFollowing) {
        result = await deleteFollow({
          followedUserId,
          followerUserId,
        });
      } else {
        result = await createFollow({
          followedUserId,
          followerUserId,
        });
      }
      return result;
    },
    onSuccess: (data) => {
      if (data) {
        toast.success(FOLLOW_TOAST_MESSAGE.SEND.SUCCESS);
      }
    },
    onError: (error, variables) => {
      const { isFollowing } = variables;

      if (isFollowing) {
        toast.error(FOLLOW_TOAST_MESSAGE.CANCEL.EXCEPTION, {
          description: error.message,
        });
      } else {
        toast.error(FOLLOW_TOAST_MESSAGE.SEND.EXCEPTION, {
          description: error.message,
        });
      }
    },
    onSettled: (_, __, variables) => {
      const { isFollowing, followedUserId, followerUserId } = variables;

      if (isFollowing) {
        toast.success(FOLLOW_TOAST_MESSAGE.CANCEL.SUCCESS);
      }

      const queryKeys = [
        FOLLOW_QUERY_KEY.FOLLOWER(followedUserId),
        FOLLOW_QUERY_KEY.COUNT.FOLLOWER(followedUserId),
        FOLLOW_QUERY_KEY.FOLLOWING(followerUserId),
        FOLLOW_QUERY_KEY.COUNT.FOLLOWING(followerUserId),
      ];
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      );
    },
  });
};
