'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { wordQuery } from '@/src/services/queries/word/word-query'
import Empty from '@/src/components/Empty'
import { List } from '@/src/components/List'
import { YStack } from '@/src/components/Stack'
import Title from '@/src/components/Title'
import FavoriteWordTag from './FavoriteWordTag'

interface Props {
  userId: string
}

export default function MyFavoriteWords({ userId }: Props) {
  const { data: usedWords } = useSuspenseQuery(wordQuery.getMyUsedWords(userId))

  const sortedUsedWords =
    usedWords?.words?.sort((a, b) => b.count - a.count) ?? []
  const shouldRenderWords = sortedUsedWords?.filter((word) => word.count > 1)

  return (
    <div className="animate-fade-in">
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
    </div>
  )
}
