"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Loader2, Lock } from "lucide-react";
import { useEffect } from "react";
import { useMe } from "@/app/_store/use-me";
import { PostCard } from "@/widgets/post/ui";
import { postQueries } from "@/entities/post/api/queries";
import useIntersect from "@/hooks/useIntersect";

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function LikedPage({ params }: Props) {
  const { userId } = await params;
  const limit = 4;
  const { me } = useMe();
  const { data, hasNextPage, fetchNextPage, isFetching, isLoading, isPending } =
    useSuspenseInfiniteQuery(postQueries.getLikedPost(userId, limit, me?.id));
  const likedPosts = data?.pages.flatMap((post) => post || []);
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
      {likedPosts && likedPosts?.length > 0 ? (
        <div className="flex flex-col gap-2">
          {likedPosts.map((item) =>
            item.post.content ? (
              <PostCard
                key={item.id}
                post={item.post}
                createdAtLiked={item.createdAt}
              />
            ) : (
              <div
                key={item?.id}
                className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/30 p-8"
              >
                <Lock className="size-5 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">
                  비공개된 게시물 입니다.
                </p>
              </div>
            ),
          )}
          <div ref={ref} />
          {isFetching && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
          )}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/30 p-12">
          <p className="text-muted-foreground">좋아요 한 게시글이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
