import AuthHistory from "@/app/(playground)/profile/[userId]/@user_info/summary/_components/AuthHistory";
import ProfileAboutMe from "@/app/(playground)/profile/[userId]/_components/ProfileAboutMe";
import ProfileHeader from "@/app/(playground)/profile/[userId]/_components/ProfileHeader";
import RenderActionButtonFromProfile from "@/app/(playground)/profile/[userId]/_components/RenderActionButtonFromProfile";
import RenderFollowButtonFromProfile from "@/app/(playground)/profile/[userId]/_components/RenderFollowButtonFromProfile";
import MyFavoriteWords from "./summary/_components/MyFavoriteWords";

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function Default({ params }: Props) {
  const { userId } = await params;
  return (
    <>
      <div className="rounded-md bg-white p-8 shadow-sm transition max-lg:py-4 dark:bg-var-darkgray">
        <div className="flex flex-col items-center justify-center gap-4">
          <ProfileHeader userId={userId} />
          <ProfileAboutMe userId={userId} />
          <RenderFollowButtonFromProfile userId={userId} />
          <RenderActionButtonFromProfile userId={userId} />
        </div>
      </div>
      <AuthHistory userId={userId} />
      <MyFavoriteWords userId={userId} />
    </>
  );
}
