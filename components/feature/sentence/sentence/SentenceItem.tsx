import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { ISentenceState } from '@/store/useSentence'
import cn from '@/lib/cn'

import useBlockEditor from '@/hooks/useBlockEditor'
import { meQuery } from '@/services/queries/auth/meQuery'
import useFavoriteSentence from '@/services/mutates/sentence/useFavoriteSentence'
import { Tables } from '@/types/supabase'
import SentenceContent from './SentenceContent'
import SentenceHeader from './SentenceHeader'

interface Props {
  sentence?: Tables<'sentence'>
  sentenceSummary?: ISentenceState
  userId: string
  isMyPage?: boolean
  className?: string
  disabled?: boolean
}

export default function SentenceItem({
  sentence,
  userId,
  isMyPage,
  sentenceSummary,
  className,
  disabled,
}: Props) {
  const sentenceId = sentence?.id || sentenceSummary?.id
  const content = sentence?.content || sentenceSummary?.content
  const tags = sentence?.tags || sentenceSummary?.tags
  const router = useRouter()
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, userId || ''),
  )
  const { editor } = useBlockEditor({
    content,
  })
  const { mutate: favoriteSentence } = useFavoriteSentence()

  if (!editor) return null

  const handleFavoriteSentence = (e: MouseEvent, sentenceId: number) => {
    e.stopPropagation()
    favoriteSentence({ userId: userId || '', sentenceId })
  }

  const handleSentenceItemClick = () => {
    router.push(`/sentence_info/${sentenceId}`, { scroll: false })
  }

  const handleAvatarClick = () => {
    router.push(`/${sentence?.user_id}/userinfo_summary`)
  }

  return (
    <div className={cn('my-4 flex flex-col gap-4', className)}>
      {sentence ? (
        <SentenceHeader
          onClick={handleAvatarClick}
          avatarUrl={sentence.avatar_url}
          userName={sentence.user_name}
          emotionLevel={sentence.emotion_level}
          createdAt={sentence.created_at}
        />
      ) : null}
      <div
        onClick={handleSentenceItemClick}
        className="cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
      >
        <SentenceContent
          tags={tags}
          editor={editor}
          disabled={disabled}
          favoritedCount={sentence?.favorite || 0}
          favoritedUserId={sentence?.favorited_user_id || []}
          commentCount={sentence?.comment || 0}
          sentenceId={sentenceId!}
          isMyPage={isMyPage}
          onFavorite={handleFavoriteSentence}
          userId={userId}
          me={me}
        />
      </div>
    </div>
  )
}
