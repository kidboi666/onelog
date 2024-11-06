import FollowerListModal from '@/app/(modals)/follower/[userId]/page'

interface Props {
  params: { userId: string }
}

export default function Page({ params }: Props) {
  return <FollowerListModal params={params} />
}
