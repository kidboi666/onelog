"use client";

import { Separator } from "@/shared/components/ui/separator";
import { ProfileAboutMeView, ProfileHeaderView } from "@/widgets/profile";
import RenderFollowButtonFromProfile from "../../_components/RenderFollowButtonFromProfile";
import AuthHistory from "./_components/AuthHistory";
import MyFavoriteWords from "./_components/MyFavoriteWords";

interface Props {
  params: { userId: string };
}

export default function UserInfoSummary({ params: { userId } }: Props) {
  return (
    <>
      <div className="rounded-md bg-white p-8 shadow-sm transition max-lg:py-4 dark:bg-var-darkgray">
        <div className="flex flex-col items-center justify-center gap-4">
          <ProfileHeaderView userId={userId} />
          <Separator className="w-full" />
          <ProfileAboutMeView userId={userId} />
          <RenderFollowButtonFromProfile userId={userId} />
        </div>
      </div>
      <AuthHistory userId={userId} />
      <MyFavoriteWords userId={userId} />
    </>
  );
}
