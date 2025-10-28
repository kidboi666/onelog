import { queryOptions } from "@tanstack/react-query";
import * as userService from "@/entities/user/lib/user-service";
import { USER_QUERY_KEY } from "@/entities/user/model/constants";

export const userQuery = {
  getUserInfo: (userId: string) =>
    queryOptions({
      queryKey: USER_QUERY_KEY.INFO(userId),
      queryFn: () => userService.getUserInfo(userId),
    }),
};
