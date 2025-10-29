"use client";

import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Loader2, Lock } from "lucide-react";
import { useEffect } from "react";
import { useMe } from "@/app/_store/use-me";
import { PostCard } from "@/app/(playground)/(home)/_components/PostCard";
import { postQueries } from "@/entities/post/api/queries";
import type { IPost } from "@/entities/post/model/types";
import { userQuery } from "@/entities/user/api/queries";
import useIntersect from "@/hooks/useIntersect";
import { PostType } from "@/shared/types/enums";

interface Props {
  params: { userId: string };
}

export default function Journals({ params }: Props) {
  const limit = 4;
  const { me } = useMe();
  const { data: user } = useSuspenseQuery(userQuery.getUserInfo(params.userId));
  const { data, fetchNextPage, hasNextPage, isFetching, isPending, isLoading } =
    useSuspenseInfiniteQuery(
      postQueries.getUserPosts(params.userId, PostType.JOURNAL, limit, me?.id),
    );
  const journals = data?.pages.flatMap((journal) => journal || []);
  const [ref, inView] = useIntersect<HTMLDivElement>({}, isLoading);

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {journals?.length! > 0 ? (
        <div className="flex flex-col gap-2">
          {journals?.map((journal: IPost) =>
            journal?.content ? (
              <PostCard key={journal?.id} post={journal} />
            ) : (
              <div
                key={journal?.id}
                className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/30 p-8"
              >
                <Lock className="size-5 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">
                  비공개된 게시물 입니다.
                </p>
              </div>
            ),
          )}
          {isFetching && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
          )}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/30 p-12">
          <p className="text-muted-foreground">아직 작성한 일기가 없습니다.</p>
        </div>
      )}
      <div ref={ref} />
    </div>
  );
}
