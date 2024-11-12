'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { postQuery } from '@/services/queries/post/postQuery'
import Empty from '@/components/shared/Empty'
import Title from '@/components/shared/Title'
import { List } from '@/components/shared/List'
import FavoriteWordTag from './FavoriteWordTag'
import { Container } from '@/components/shared/Container'
import { YStack } from '@/components/shared/Stack'
import { IFavoriteWord } from '@/types/post'

interface Props {
  userId: string
}

export default function MyFavoriteWords({ userId }: Props) {
  const { data: words } = useSuspenseQuery(
    postQuery.getMyUsedWords(supabase, userId),
  )
  const typedWords = words?.words as unknown as IFavoriteWord[]
  const sortedUsedWords = typedWords?.sort((a, b) => b?.count - a?.count)
  const shouldRenderWords = sortedUsedWords?.filter((word) => word.count > 1)

  return (
    <Container className="animate-fade-in">
      <YStack gap={8}>
        <Title>가장 많이 사용하는</Title>
        {shouldRenderWords?.length! >= 1 ? (
          <List className="flex flex-wrap gap-2">
            {shouldRenderWords?.map((word, index) => {
              if (index >= 20) {
                return null
              } else {
                return <FavoriteWordTag key={word.word} word={word} />
              }
            })}
          </List>
        ) : (
          <Empty>
            <Empty.Text>아직 자주 사용하는 단어가 없습니다.</Empty.Text>
          </Empty>
        )}
      </YStack>
    </Container>
  )
}
