import { redirect } from 'next/navigation'

interface Props {
  params: { userId: string }
}

export default function userInfo({ params }: Props) {
  const userId = params.userId
  redirect(`/${userId}/userinfo_summary`)
}
