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
import SentenceHeader from './SentenceHeader'
import SentenceContent from './SentenceContent'

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

  const handleFavoriteSentence = (
    e: MouseEvent,
    { sentenceId }: { sentenceId: number },
  ) => {
    e.stopPropagation()
    favoriteSentence({ userId: userId || '', sentenceId })
  }

  const handleSentenceItemClick = () => {
    router.push(`/sentence_page/${sentenceId}`, { scroll: false })
  }

  const handleAvatarClick = () => {
    router.push(`/${sentence?.user_id}`)
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {sentence ? (
        <SentenceHeader
          userId={sentence.user_id}
          meId={me.id}
          isMe={me?.id === sentence.user_id}
          email={sentence.email}
          avatarUrl={sentence.avatar_url}
          userName={sentence.user_name}
          emotionLevel={sentence.emotion_level}
          createdAt={sentence.created_at}
          onClick={handleAvatarClick}
        />
      ) : null}
      <SentenceContent
        tags={tags}
        editor={editor}
        accessType={sentence?.access_type}
        favoritedCount={sentence?.favorite || 0}
        favoritedUserId={sentence?.favorited_user_id || []}
        commentCount={sentence?.comment || 0}
        sentenceId={sentenceId!}
        onFavorite={handleFavoriteSentence}
        onClick={handleSentenceItemClick}
        userId={userId}
        me={me}
        isMyPage={isMyPage}
        disabled={disabled}
      />
    </div>
  )
}
