'use client'

import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { userQuery } from '@/services/queries/auth/userQuery'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import useIntersect from '@/hooks/useIntersect'
import { ISentenceWithUserInfo } from '@/types/sentence'
import SentenceCard from '@/app/(playground)/home/_components/SentenceCard'
import { Container } from '@/components/shared/Container'
import Spinner from '@/components/shared/Spinner'
import { YStack } from '@/components/shared/Stack'
import Empty from '@/components/shared/Empty'
import useMe from '@/hooks/useMe'

interface Props {
  params: { userId: string }
}

export default function Journals({ params }: Props) {
  const limit = 4
  const { me, session } = useMe()
  const { data: user } = useSuspenseQuery(
    userQuery.getUserInfo(supabase, params.userId),
  )
  const isMe = me?.id === user?.id
  const { data, fetchNextPage, hasNextPage, isFetching, isPending, isLoading } =
    useInfiniteQuery(
      sentenceQuery.getAllUserSentence(
        supabase,
        params.userId,
        'journal',
        limit,
        isMe,
      ),
    )
  const journals = data?.pages.flatMap((journal) => journal || [])
  const [ref, inView] = useIntersect<HTMLDivElement>({}, !!isLoading)
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

  if (isPending) {
    return (
      <Spinner.Container>
        <Spinner size={60} />
      </Spinner.Container>
    )
  }

  return (
    <Container className="animate-fade-in">
      {journals?.length! > 0 ? (
        <YStack gap={8}>
          {journals?.map((journal: ISentenceWithUserInfo) =>
            journal?.content ? (
              <SentenceCard
                key={journal?.id}
                meId={session ? me?.id : null}
                sentence={journal}
                session={session}
                sentenceUserInfo={sentenceUserInfo}
              />
            ) : (
              <Empty key={journal?.id}>
                <Empty.Icon view="0 -960 960 960" size={20}>
                  <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                </Empty.Icon>
                <Empty.Text>비공개된 게시물 입니다.</Empty.Text>
              </Empty>
            ),
          )}
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
