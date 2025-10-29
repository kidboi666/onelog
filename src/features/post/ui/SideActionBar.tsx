"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMe } from "@/app/_store/use-me";
import AccessTypeButtonWithDropDown from "@/app/(playground)/(home)/_components/AccessTypeButtonWithDropDown";
import OptionButtonWithDropDown from "@/app/(playground)/(home)/_components/OptionButtonWithDropDown";
import ReportButton from "@/app/(playground)/(home)/_components/ReportButton";
import ShareButton from "@/app/(playground)/(home)/_components/ShareButton";
import { postQueries } from "@/entities/post/api/queries";

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
      <AccessTypeButtonWithDropDown
        accessType={accessType}
        viewToolTip
        isSide
      />
      <ShareButton isSide viewToolTip />
      <ReportButton postId={postId} viewToolTip isSide />
      <OptionButtonWithDropDown type="post" postId={postId} isSide />
    </>
  );
}
