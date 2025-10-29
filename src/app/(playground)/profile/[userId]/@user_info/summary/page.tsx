"use client";

import { Separator } from "@/shared/components/ui/separator";
import ProfileAboutMe from "../../_components/ProfileAboutMe";
import ProfileHeader from "../../_components/ProfileHeader";
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
          <ProfileHeader userId={userId} />
          <Separator className="w-full" />
          <ProfileAboutMe userId={userId} />
          <RenderFollowButtonFromProfile userId={userId} />
        </div>
      </div>
      <AuthHistory userId={userId} />
      <MyFavoriteWords userId={userId} />
    </>
  );
}
