import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

import { ISentenceState } from '@/store/useSentence'
import useBlockEditor from '@/hooks/useBlockEditor'
import { followQuery } from '@/services/queries/follow/followQuery'
import useFavoriteSentence from '@/services/mutates/sentence/useFavoriteSentence'
import { ISentenceWithUserInfo } from '@/types/sentence'

import SentenceHeader from './SentenceHeader'
import SentenceContent from './SentenceContent'
import { YStack } from '@/components/shared/Stack'
import { TEmotion } from '../../write/sentence/_containers/PostContainer'
import { countFollowQuery } from '@/services/queries/follow/countFollowQuery'

interface Props {
  sentence?: ISentenceWithUserInfo
  sentenceUserInfo?: any
  sentenceSummary?: ISentenceState
  meId?: string | null
  disabled?: boolean
}

export default function SentenceCard({
  sentence,
  sentenceUserInfo,
  meId,
  sentenceSummary,
  disabled,
}: Props) {
  const router = useRouter()
  const sentenceId = sentence?.id || sentenceSummary?.id
  const content = sentence?.content || sentenceSummary?.content
  const tags = sentence?.tags || sentenceSummary?.tags
  const { data: followingCount } = useSuspenseQuery(
    countFollowQuery.countFollowing(supabase, sentence?.user_id),
  )
  const { data: followerCount } = useSuspenseQuery(
    countFollowQuery.countFollower(supabase, sentence?.user_id),
  )
  const { data: followers } = useSuspenseQuery(
    followQuery.getFollower(supabase, sentence?.user_id),
  )
  const { editor } = useBlockEditor({
    content,
  })
  const { mutate: favoriteSentence } = useFavoriteSentence()
  const isFollowing = followers?.find((user) => user.follower_user_id === meId)

  const handleFavoriteSentence = (e: MouseEvent) => {
    e.stopPropagation()
    meId ? favoriteSentence({ sentenceId, meId }) : router.push('/auth_guard')
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
          meId={meId}
          isMe={meId === sentence.user_id}
          isFollowing={!!isFollowing}
          followerCount={followerCount}
          followingCount={followingCount}
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
        favoritedCount={sentence?.favorite || 0}
        favoritedUserId={sentence?.favorited_user_id || []}
        commentCount={sentence?.comment || 0}
        sentenceUserId={sentence?.user_id}
        sentenceId={sentenceId}
        onFavorite={handleFavoriteSentence}
        onClick={handleSentenceItemClick}
        meId={meId}
        disabled={disabled}
      />
    </YStack>
  )
}
