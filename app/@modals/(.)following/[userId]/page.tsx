import FollowingListModal from '@/app/(modals)/following/[userId]/page'

interface Props {
  params: { userId: string }
}

export default function Page({ params }: Props) {
  return <FollowingListModal params={params} />
}
