import { YStack } from '@/components/shared/Stack'
import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  profile: ReactNode
  user_info: ReactNode
}

export default async function UserLayout({
  profile,
  user_info,
}: PropsWithChildren<Props>) {
  return (
    <YStack gap={8}>
      {profile}
      {user_info}
    </YStack>
  )
}
