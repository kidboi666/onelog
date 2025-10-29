"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMe } from "@/app/_store/use-me";
import { postQueries } from "@/entities/post/api/queries";
import { AccessTypeSelector } from "./access-type-selector";
import { PostOptionsMenu } from "./post-options-menu";
import { ReportButton } from "./report-button";
import { ShareButton } from "./share-button";

interface Props {
  postId: number;
}

export function SideActionBar({ postId }: Props) {
  const { me } = useMe();
  const { data: post } = useSuspenseQuery(postQueries.getPost(postId, me?.id));

  if (!post) {
    return null;
  }

  const { accessType } = post;

  return (
    <>
      <AccessTypeSelector
        accessType={accessType}
        viewToolTip
        isSide
      />
      <ShareButton isSide viewToolTip />
      <ReportButton postId={postId} viewToolTip isSide />
      <PostOptionsMenu type="post" postId={postId} isSide />
    </>
  );
}
