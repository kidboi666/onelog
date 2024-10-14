'use client'

import { MouseEvent } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { meQuery } from '@/services/queries/auth/meQuery'
import useFavoriteSentence from '@/services/mutates/sentence/useFavoriteSentence'
import useBlockEditor from '@/hooks/useBlockEditor'
import SentenceHeader from '@/components/feature/sentence/SentenceHeader'
import SentenceContent from '@/components/feature/sentence/SentenceContent'
import { useRouter } from 'next/navigation'
import { followQuery } from '@/services/queries/follow/followQuery'

interface Props {
  params: { sentenceId: string }
}

export default function SentencePage({ params }: Props) {
  const router = useRouter()
  const sentenceId = params.sentenceId
  const { data: sentence } = useSuspenseQuery(
    sentenceQuery.getSentence(supabase, sentenceId),
  )
  const { data } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, data!.userId),
  )
  const { data: followers } = useSuspenseQuery(
    followQuery.getFollowers(supabase, sentence?.user_id),
  )
  const { data: followings } = useSuspenseQuery(
    followQuery.getFollwing(supabase, sentence?.user_id),
  )
  const isFollowing = followers?.find(
    (user) => user.follower_user_id === data!.userId,
  )
  const { editor } = useBlockEditor({ content: sentence?.content })
  const { mutate: favoriteSentence } = useFavoriteSentence()

  if (!editor) return null

  const handleFavoriteSentence = (
    e: MouseEvent,
    { sentenceId }: { sentenceId: number },
  ) => {
    e.stopPropagation()
    favoriteSentence({ userId: me.id || '', sentenceId })
  }

  const handleAvatarClick = () => {
    router.push(`/${sentence?.user_id}`)
  }

  return (
    <div className="m-4 flex flex-col gap-4">
      {sentence ? (
        <SentenceHeader
          userId={sentence.user_id}
          isMe={sentence.user_id === me.id}
          isFollowing={!!isFollowing}
          followers={followers}
          followings={followings}
          meId={me.id}
          email={sentence.user_info.email}
          avatarUrl={sentence.user_info.avatar_url}
          userName={sentence.user_info.user_name}
          emotionLevel={sentence.emotion_level}
          createdAt={sentence.created_at}
          onClick={handleAvatarClick}
        />
      ) : null}
      <SentenceContent
        tags={sentence?.tags!}
        editor={editor}
        favoritedCount={sentence?.favorite || 0}
        favoritedUserId={sentence?.favorited_user_id || []}
        commentCount={sentence?.comment || 0}
        sentenceId={sentence?.id!}
        accessType={sentence?.access_type}
        onFavorite={handleFavoriteSentence}
        userId={me?.id}
        me={me!}
      />
    </div>
  )
}
