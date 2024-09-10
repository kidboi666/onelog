import RefBox from '@/components/shared/RefBox'
import Spinner from '@/components/shared/Spinner'
import Text from '@/components/shared/Text'
import { supabase } from '@/lib/supabase/client'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { IFavoriteWord } from '@/types/sentence'
import { useQuery } from '@tanstack/react-query'
import { RefObject } from 'react'

interface Props {
  word: IFavoriteWord
  onTransitionEnd: () => void
  targetRef: RefObject<HTMLDivElement>
  isHover: boolean
}

export default function TagInfo({
  word,
  onTransitionEnd,
  targetRef,
  isHover,
}: Props) {
  const { data, isFetching } = useQuery(
    sentenceQuery.getUsedWords(supabase, word.word, isHover),
  )

  return (
    <RefBox
      isBackground
      isRounded
      dataStatus="closed"
      onTransitionEnd={onTransitionEnd}
      ref={targetRef}
      className="data-slideDown status-slideDown absolute -top-10 z-10 origin-bottom-left text-nowrap p-2 shadow-md"
    >
      {isFetching ? (
        <Spinner size={20} />
      ) : (
        <>
          <Text size="xs">단어 사용 횟수 : {word.count}</Text>
          <Text size="xs">다른 사람들이 사용한 횟수 : {data?.count}</Text>
        </>
      )}
    </RefBox>
  )
}
