"use client";

import { Separator } from "@/shared/components/ui/separator";
import {
  ProfileAboutMeView,
  ProfileFollowStats,
  ProfileHeaderView,
  UserFavoriteWordsView,
  UserHistoryStatsView,
} from "@/widgets/profile";

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
          <ProfileFollowStats userId={userId} />
        </div>
      </div>
      <UserHistoryStatsView userId={userId} />
      <UserFavoriteWordsView userId={userId} />
    </>
  );
}
