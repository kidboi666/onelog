import { infiniteQueryOptions } from "@tanstack/react-query";
import { getInfinitePublicArticleList } from "@/entities/article/article.api";
import {
  type InfiniteArticleList,
  POST_QUERY_KEY,
} from "@/entities/article/article.model";

export const articleQueries = {
  infinite: () =>
    infiniteQueryOptions({
      queryKey: POST_QUERY_KEY.PUBLIC,
      queryFn: async ({ pageParam }): Promise<InfiniteArticleList> =>
        getInfinitePublicArticleList(pageParam),
      initialPageParam: "",
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    }),
};
