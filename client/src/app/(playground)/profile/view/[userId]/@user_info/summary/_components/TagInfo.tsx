import { useQuery } from '@tanstack/react-query'
import { RefObject } from 'react'
import { supabase } from '@/src/lib/supabase/client'
import { wordQuery } from '@/src/services/queries/word/word-query'
import { IFavoriteWord } from '@/src/types/word'
import Spinner from '@/src/components/Spinner'
import TextDisplay from '@/src/components/TextDisplay'

interface Props {
  word: IFavoriteWord
  trigger: boolean
  onTransitionEnd: () => void
  targetRef: RefObject<HTMLDivElement>
}

export default function TagInfo({
  word,
  onTransitionEnd,
  trigger,
  targetRef,
}: Props) {
  const { data, isFetching } = useQuery(
    wordQuery.getUsedWords(supabase, word.word, trigger),
  )

  return (
    <div
      data-status="closed"
      onTransitionEnd={onTransitionEnd}
      ref={targetRef}
      className="data-slideDown status-slideDown absolute -top-10 z-10 hidden origin-bottom-left text-nowrap rounded-md bg-white p-2 shadow-md dark:bg-var-darkgray"
    >
      {isFetching ? (
        <Spinner size={20} />
      ) : (
        <>
          <TextDisplay size="xs">단어 사용 횟수 : {word.count}</TextDisplay>
          <TextDisplay size="xs">
            다른 사람들이 사용한 횟수 : {data?.count}
          </TextDisplay>
        </>
      )}
    </div>
  )
}
