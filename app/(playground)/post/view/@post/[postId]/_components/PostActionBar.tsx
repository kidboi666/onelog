"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMe } from "@/app/store/use-me";
import { postQueries } from "@/entities/post/api/queries";
import { Separator } from "@/shared/components/ui/separator";
import AccessTypeButtonWithDropDown from "../../../../(home)/_components/AccessTypeButtonWithDropDown";
import CommentButton from "../../../../(home)/_components/CommentButton";
import LikeButton from "../../../../(home)/_components/LikeButton";
import OptionButtonWithDropDown from "../../../../(home)/_components/OptionButtonWithDropDown";
import ReportButton from "../../../../(home)/_components/ReportButton";
import ShareButton from "../../../../(home)/_components/ShareButton";

interface Props {
  postId: number;
}

export default function PostActionBar({ postId }: Props) {
  const { me } = useMe();
  const { data: post } = useSuspenseQuery(postQueries.getPost(postId, me?.id));

  if (!post) {
    return null;
  }

  const { isLiked, likeCount, commentCount, accessType } = post;

  return (
    <div className="flex flex-col sm:hidden">
      <Separator />
      <div className="flex items-center justify-between">
        <LikeButton
          isLike={isLiked.length >= 1}
          likeCount={likeCount[0].count}
          postId={postId}
          viewToolTip
        />
        <CommentButton viewToolTip commentCount={commentCount[0].count} />
        <AccessTypeButtonWithDropDown accessType={accessType} viewToolTip />
        <ShareButton viewToolTip />
        <ReportButton viewToolTip postId={postId} />
        <OptionButtonWithDropDown type="post" postId={post.id} />
      </div>
    </div>
  );
}
