'use client'

import AuthHistory from '@/src/app/(playground)/profile/view/[userId]/@user_info/summary/_components/AuthHistory'
import MyFavoriteWords from './_components/MyFavoriteWords'

interface Props {
  params: { userId: string }
}

export default function UserInfoSummary({ params: { userId } }: Props) {
  return (
    <>
      <AuthHistory userId={userId} />
      <MyFavoriteWords userId={userId} />
    </>
  )
}
