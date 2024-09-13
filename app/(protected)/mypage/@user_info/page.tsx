import { createServerClient } from '@/lib/supabase/server'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { gardenQuery } from '@/services/queries/garden/gardenQuery'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { meQuery } from '@/services/queries/auth/meQuery'
import { ISessionInfo } from '@/types/auth'

import Summary from './_components/summary'
import FavoriteWords from './_components/favorite_word'
import Garden from './_components/garden'
import PrevOneSentence from './_components/one_sentence'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import PostSentence from './_components/post_sentence'
// import MyFavoriteSentence from './_components/my_favorite_sentence'

export default async function UserInfoSection() {
  const supabase = createServerClient()
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(meQuery.getUserSession(supabase))
  const res = queryClient.getQueryData<ISessionInfo>(['me', 'session'])

  if (!res) return
  queryClient.prefetchQuery(sentenceQuery.getMyUsedWords(supabase, res.userId))
  queryClient.prefetchQuery(gardenQuery.getGarden(supabase, res.userId))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostSentence />
      <Summary />
      <FavoriteWords />
      <Garden />
      <PrevOneSentence />
      {/* <MyFavoriteSentence /> */}
    </HydrationBoundary>
  )
}
