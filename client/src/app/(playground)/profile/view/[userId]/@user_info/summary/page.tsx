'use client'

import Line from '@/src/components/Line'
import { YStack } from '@/src/components/Stack'
import AuthHistory from '@/src/app/(playground)/profile/view/[userId]/@user_info/summary/_components/AuthHistory'
import ProfileAboutMe from '@/src/app/(playground)/profile/view/[userId]/_components/ProfileAboutMe'
import ProfileHeader from '@/src/app/(playground)/profile/view/[userId]/_components/ProfileHeader'
import RenderActionButtonFromProfile from '@/src/app/(playground)/profile/view/[userId]/_components/RenderActionButtonFromProfile'
import RenderFollowButtonFromProfile from '@/src/app/(playground)/profile/view/[userId]/_components/RenderFollowButtonFromProfile'
import MyFavoriteWords from './_components/MyFavoriteWords'

interface Props {
  params: { userId: string }
}

export default function UserInfoSummary({ params: { userId } }: Props) {
  return (
    <>
      <div className="rounded-md bg-white p-8 shadow-sm transition max-lg:py-4 dark:bg-var-darkgray">
        <YStack gap={4} className="items-center justify-center">
          <ProfileHeader userId={userId} />
          <Line className="w-full" />
          <ProfileAboutMe userId={userId} />
          <RenderFollowButtonFromProfile userId={userId} />
          <RenderActionButtonFromProfile userId={userId} />
        </YStack>
      </div>
      <AuthHistory userId={userId} />
      <MyFavoriteWords userId={userId} />
    </>
  )
}
