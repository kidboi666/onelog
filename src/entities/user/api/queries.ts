import { queryOptions } from "@tanstack/react-query";
import { getUserInfo } from "@/entities/user/api/user-api";
import { USER_QUERY_KEY } from "@/entities/user/model/constants";

export const userQuery = {
  getUserInfo: (userId: string) =>
    queryOptions({
      queryKey: USER_QUERY_KEY.INFO(userId),
      queryFn: () => getUserInfo(userId),
    }),
};
