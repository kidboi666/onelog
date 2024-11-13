import { YStack } from '@/components/shared/Stack'
import { createServerClient } from '@/lib/supabase/server'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { userQuery } from '@/services/queries/auth/user-query'
import { Tables } from '@/types/supabase'
import { PropsWithChildren, ReactNode } from 'react'

interface MetadataProps {
  params: { userId: string }
  profile: ReactNode
  user_info: ReactNode
}

export async function generateMetadata({ params }: MetadataProps) {
  const queryClient = getQueryClient()
  const supabase = createServerClient()

  await queryClient.prefetchQuery(
    userQuery.getUserInfo(supabase, params.userId),
  )
  const userInfo = queryClient.getQueryData<Tables<'user_info'>>([
    'user',
    'info',
    params.userId,
  ])

  return {
    title: `${userInfo?.user_name}`,
  }
}

interface Props {
  profile: ReactNode
  user_info: ReactNode
}

export default async function UserLayout({
  profile,
  user_info,
}: PropsWithChildren<Props>) {
  return (
    <YStack gap={8} className="animate-fade-in">
      {profile}
      {user_info}
    </YStack>
  )
}
