import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

import { ISentenceState } from '@/store/useSentence'
import useBlockEditor from '@/hooks/useBlockEditor'
import { followQuery } from '@/services/queries/follow/followQuery'
import { ISentenceWithUserInfo } from '@/types/sentence'

import SentenceHeader from './SentenceHeader'
import SentenceContent from './SentenceContent'
import { YStack } from '@/components/shared/Stack'
import { countFollowQuery } from '@/services/queries/follow/countFollowQuery'
import useLikeSentence from '@/services/mutates/sentence/useLikeSentence'
import useUnlikeSentence from '@/services/mutates/sentence/useUnlikeSentence'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { TEmotion } from '../../write/page'
import { MouseEvent } from 'react'
import { countCommentQuery } from '@/services/queries/comment/countCommentQuery'
import { IUserSession } from '@/services/queries/auth/meQuery'

interface Props {
  sentence?: ISentenceWithUserInfo
  sentenceUserInfo?: any
  sentenceSummary?: ISentenceState
  createdAtLiked?: string
  meId?: string | null
  session?: IUserSession | null
  disabled?: boolean
}

export default function SentenceCard({
  sentence,
  sentenceUserInfo,
  createdAtLiked,
  meId,
  session,
  disabled,
}: Props) {
  const router = useRouter()
  const sentenceId = Number(sentence?.id)
  const content = sentence?.content
  const tags = sentence?.tags || []
  const { data: followingCount } = useSuspenseQuery(
    countFollowQuery.countFollowing(supabase, sentence?.user_id),
  )
  const { data: followerCount } = useSuspenseQuery(
    countFollowQuery.countFollower(supabase, sentence?.user_id),
  )
  const { data: commentCount } = useSuspenseQuery(
    countCommentQuery.countCommentFromSentence(supabase, sentence?.id),
  )
  const { data: followers } = useSuspenseQuery(
    followQuery.getFollower(supabase, sentence?.user_id),
  )
  const { data: isLiked } = useSuspenseQuery(
    sentenceQuery.checkLiked(supabase, sentenceId, meId || ''),
  )
  const { editor } = useBlockEditor({
    content,
  })
  const isFollowing = followers?.find((user) => user.follower_user_id === meId)

  const { mutate: like } = useLikeSentence()
  const { mutate: unlike } = useUnlikeSentence()

  const handleFavorite = (e: MouseEvent) => {
    e.stopPropagation()
    if (!session) return router.push('/modal/auth_guard', { scroll: false })
    isLiked
      ? unlike({ meId, sentenceId })
      : like({
          meId,
          sentenceId: sentenceId,
        })
  }

  const handleSentenceItemClick = () => {
    router.push(`/sentence_page/${sentenceId}`)
  }

  if (!editor) return null

  return (
    <YStack>
      {sentence ? (
        <SentenceHeader
          userId={sentence.user_id}
          isMe={meId === sentence.user_id}
          isFollowing={!!isFollowing}
          followerCount={followerCount}
          followingCount={followingCount}
          createdAtLiked={createdAtLiked}
          postType={sentence.post_type}
          email={sentenceUserInfo.email}
          avatarUrl={sentenceUserInfo.avatar_url}
          userName={sentenceUserInfo.user_name}
          emotionLevel={sentence.emotion_level as TEmotion}
          createdAt={sentence.created_at}
        />
      ) : null}
      <SentenceContent
        tags={tags}
        editor={editor}
        sentenceTitle={sentence?.title}
        accessType={sentence?.access_type}
        favoritedCount={sentence?.like?.[0].count}
        isLiked={isLiked}
        commentCount={commentCount || 0}
        sentenceUserId={sentence?.user_id}
        sentenceId={sentenceId}
        onFavorite={handleFavorite}
        onClick={handleSentenceItemClick}
        meId={meId}
        disabled={disabled}
      />
    </YStack>
  )
}
