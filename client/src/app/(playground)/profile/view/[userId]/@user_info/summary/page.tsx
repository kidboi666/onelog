import { HydrationBoundary } from '@tanstack/react-query'
import { postPrefetchQuery } from '@/src/services/queries/post/post-prefetch-query';
import AuthHistory from './_components/AuthHistory';
import MyFavoriteWords from './_components/MyFavoriteWords';


interface Props {
  params: { userId: string }
}

export default async function UserInfoSummary({ params }: Props) {
  const userId = params.userId
  const state = await postPrefetchQuery.countAllMyPost(userId)

  return (
    <HydrationBoundary state={state}>
      <AuthHistory userId={userId} />
      <MyFavoriteWords userId={userId} />
    </HydrationBoundary>
  )
}
