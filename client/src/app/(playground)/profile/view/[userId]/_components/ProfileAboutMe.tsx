'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { userQuery } from '@/src/services/queries/auth/user-query'
import { ZStack } from '@/src/components/Stack'
import TextDisplay from '@/src/components/TextDisplay'

interface Props {
  userId: string
}

export default function ProfileAboutMe({ userId }: Props) {
  const { data: user } = useSuspenseQuery(userQuery.getUserInfo(userId))
  return (
    <ZStack direction="col" gap={4}>
      <TextDisplay>
        {user.aboutMe ? user.aboutMe : '자기 소개를 작성해주세요.'}
      </TextDisplay>
    </ZStack>
  )
}
