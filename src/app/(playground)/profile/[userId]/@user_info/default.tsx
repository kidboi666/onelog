import MenuSection from "@/app/(playground)/profile/[userId]/@user_info/journal_garden/_components/MenuSection";
import {
  ProfileAboutMeView,
  ProfileActionButtons,
  ProfileFollowStats,
  ProfileHeaderView,
  UserFavoriteWordsView,
  UserHistoryStatsView,
} from "@/widgets/profile";

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function Default({ params }: Props) {
  const { userId } = await params;
  return (
    <>
      <div className="rounded-md bg-card p-8 shadow-sm transition max-lg:py-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <ProfileHeaderView userId={userId} />
          <ProfileAboutMeView userId={userId} />
          <ProfileFollowStats userId={userId} />
          <ProfileActionButtons userId={userId} />
        </div>
      </div>
      <MenuSection userId={userId} />
      <UserHistoryStatsView userId={userId} />
      <UserFavoriteWordsView userId={userId} />
    </>
  );
}
