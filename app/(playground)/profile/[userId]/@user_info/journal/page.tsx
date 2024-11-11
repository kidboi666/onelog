'use client'

import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { userQuery } from '@/services/queries/auth/userQuery'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import useIntersect from '@/hooks/useIntersect'
import { ISentenceWithUserInfo } from '@/types/sentence'
import SentenceCard from '@/app/(playground)/home/_components/SentenceCard'
import { Container } from '@/components/shared/Container'
import Spinner from '@/components/shared/Spinner'
import { YStack } from '@/components/shared/Stack'
import Empty from '@/components/shared/Empty'

export default function Journals() {
  const limit = 4
  const [, , userId] = usePathname().split('/')
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: user } = useSuspenseQuery(
    userQuery.getUserInfo(supabase, userId),
  )
  const isMe = me?.userId === user.id
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    sentenceQuery.getAllUserSentence(supabase, userId, 'journal', limit, isMe),
  )
  const journals = data?.pages.flatMap((journal) => journal || [])
  const [ref, inView] = useIntersect<HTMLDivElement>()
  const sentenceUserInfo = {
    email: user?.email,
    user_name: user?.user_name,
    avatar_url: user?.avatar_url,
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <Container className="animate-fade-in">
      {journals?.length! > 0 ? (
        <YStack gap={8}>
          {journals?.map((journal: ISentenceWithUserInfo) => (
            <SentenceCard
              key={journal.id}
              meId={me?.userId}
              sentence={journal}
              sentenceUserInfo={sentenceUserInfo}
            />
          ))}
          {isFetching && (
            <Spinner.Container>
              <Spinner size={60} />
            </Spinner.Container>
          )}
        </YStack>
      ) : (
        <Empty>
          <Empty.Text>아직 작성한 일기가 없습니다.</Empty.Text>
        </Empty>
      )}
      <div ref={ref} />
    </Container>
  )
}
