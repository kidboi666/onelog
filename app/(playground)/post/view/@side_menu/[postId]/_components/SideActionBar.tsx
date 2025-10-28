"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMe } from "@/app/store/use-me";
import { postQueries } from "@/entities/post/api/queries";
import AccessTypeButtonWithDropDown from "../../../../../(home)/_components/AccessTypeButtonWithDropDown";
import OptionButtonWithDropDown from "../../../../../(home)/_components/OptionButtonWithDropDown";
import ReportButton from "../../../../../(home)/_components/ReportButton";
import ShareButton from "../../../../../(home)/_components/ShareButton";

interface Props {
  postId: number;
}

export default function SideActionBar({ postId }: Props) {
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
