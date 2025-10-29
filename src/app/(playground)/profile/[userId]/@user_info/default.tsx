import MenuSection from "@/app/(playground)/profile/[userId]/@user_info/journal_garden/_components/MenuSection";
import AuthHistory from "@/app/(playground)/profile/[userId]/@user_info/summary/_components/AuthHistory";
import RenderActionButtonFromProfile from "@/app/(playground)/profile/[userId]/_components/RenderActionButtonFromProfile";
import RenderFollowButtonFromProfile from "@/app/(playground)/profile/[userId]/_components/RenderFollowButtonFromProfile";
import { ProfileAboutMeView, ProfileHeaderView } from "@/widgets/profile";
import MyFavoriteWords from "./summary/_components/MyFavoriteWords";

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
          <RenderFollowButtonFromProfile userId={userId} />
          <RenderActionButtonFromProfile userId={userId} />
        </div>
      </div>
      <MenuSection userId={userId} />
      <AuthHistory userId={userId} />
      <MyFavoriteWords userId={userId} />
    </>
  );
}
