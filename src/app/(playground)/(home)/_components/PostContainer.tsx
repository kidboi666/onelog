"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useMe } from "@/app/_store/use-me";
import { postQueries } from "@/entities/post/api/queries";
import { PostCard } from "./PostCard";

const PAGINATION_LIMIT = 10;

export default function PostContainer() {
  const { me } = useMe();

  const { data, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery(postQueries.getAllPost(PAGINATION_LIMIT, me?.id));

  const posts = useMemo(
    () => data.pages.flatMap((page) => page || []) ?? [],
    [data],
  );

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          void fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    const target = document.getElementById("infinite-scroll-trigger");
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [hasNextPage, isFetching, fetchNextPage]);

  return (
    <div className="flex flex-col gap-12">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <div id="infinite-scroll-trigger" className="h-4" />
      {isFetching && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="size-12 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
