"use client";

import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { useSelectedLayoutSegment } from "next/navigation";
import React from "react";
import NavigationMenuButton from "@/app/(playground)/profile/[userId]/@user_info/journal_garden/_components/NavigationMenuButton";
import { postCountQueries } from "@/entities/post/api/queries";
import { Separator } from "@/shared/components/ui/separator";
import { PROFILE_NAVIGATE_MENUS } from "../../../_constants/navigate";

interface Props {
  userId: string;
}

export default function MenuSection({ userId }: Props) {
  const postTypes = ["journal", "article"] as const;

  // userId 유효성 검사
  if (!userId || userId === "") {
    return null;
  }

  const { data: counts } = useSuspenseQueries({
    queries: postTypes.map(() => postCountQueries.countUserPosts(userId)),
    combine: (results) => {
      return {
        data: results.map((result, index) => ({
          count: result.data ?? null,
          postType: postTypes[index],
        })),
        pending: results.some((result) => result.isPending),
      };
    },
  });
  const { data: likedCount } = useSuspenseQuery(
    postCountQueries.countLikedPost(userId),
  );
  const segment = useSelectedLayoutSegment();

  return (
    <div className="flex justify-between rounded-md bg-card p-2 shadow-sm">
      {PROFILE_NAVIGATE_MENUS.map((menu, idx) => {
        return (
          <React.Fragment key={menu.id}>
            <NavigationMenuButton
              segment={segment}
              menu={menu}
              counts={counts}
              likedCount={likedCount}
              userId={userId}
            />
            {PROFILE_NAVIGATE_MENUS.length === idx + 1 ? null : (
              <Separator orientation="vertical" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
