import { createUserServerAdapter } from '@/src/adapters/create-server-adapter'
import { QUERY_KEY } from '@/src/constants'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import Line from '@/src/components/Line'
import { YStack } from '@/src/components/Stack'
import ProfileAboutMe from '@/src/app/(playground)/profile/view/[userId]/_components/ProfileAboutMe'
import ProfileHeader from '@/src/app/(playground)/profile/view/[userId]/_components/ProfileHeader'
import RenderActionButtonFromProfile from '@/src/app/(playground)/profile/view/[userId]/_components/RenderActionButtonFromProfile'
import RenderFollowButtonFromProfile from '@/src/app/(playground)/profile/view/[userId]/_components/RenderFollowButtonFromProfile'

interface Props {
  params: { userId: string }
}

export default async function ProfilePage({ params: { userId } }: Props) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEY.USER.INFO(userId),
    queryFn: async () => {
      const userServerAdapter = await createUserServerAdapter()
      return userServerAdapter.getUserInfo(userId)
    },
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="rounded-md bg-white p-8 shadow-sm transition max-lg:py-4 dark:bg-var-darkgray">
        <YStack gap={4} className="items-center justify-center">
          <ProfileHeader userId={userId} />
          <Line className="w-full" />
          <ProfileAboutMe userId={userId} />
          <RenderFollowButtonFromProfile userId={userId} />
          <RenderActionButtonFromProfile userId={userId} />
        </YStack>
      </div>
    </HydrationBoundary>
  )
}
