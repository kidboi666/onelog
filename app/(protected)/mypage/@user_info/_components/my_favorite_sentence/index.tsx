'use client'

import Container from '@/components/shared/Container'
import { List } from '@/components/shared/List'
import Title from '@/components/shared/Title'
import Empty from '@/components/shared/Empty'
import { useSuspenseQuery } from '@tanstack/react-query'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'

export default function MyFavoriteSentence() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: favoriteSentences } = useSuspenseQuery(
    sentenceQuery.getMyFavoriteSentence(supabase, me?.userId),
  )
  console.log(favoriteSentences)
  return (
    <Container className="flex flex-col gap-4">
      <Title>내가 좋아하는 문장</Title>
      {favoriteSentences ? (
        <List isRounded isBackground className="flex flex-col p-4">
          {/* <Title type="sub" size="sm" className="mb-4">
            {formatDateToMDY(sentences[0].created_at)}
          </Title> */}
          {/* {favoriteSentences?.map((item) => (
            <SentenceItem key={item.id} sentence={item} />
          ))} */}
        </List>
      ) : (
        <Empty>작성된 내용이 없습니다.</Empty>
      )}
    </Container>
  )
}
