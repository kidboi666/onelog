'use client'

import Link from 'next/link'
import { MouseEvent, Suspense, useState, useTransition } from 'react'
import { EditorContent } from '@tiptap/react'
import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { meQuery } from '@/services/queries/auth/meQuery'
import useFavoriteSentence from '@/services/mutates/sentence/useFavoriteSentence'
import useFollow from '@/services/mutates/follow/useFollow'
import useUnFollow from '@/services/mutates/follow/useUnFollow'
import { followQuery } from '@/services/queries/follow/followQuery'
import useBlockEditor from '@/hooks/useBlockEditor'

import Avatar from '@/components/shared/Avatar'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import Line from '@/components/shared/Line'
import Tag from '@/components/shared/Tag'
import LinkButton from '@/components/shared/LinkButton'
import { List } from '@/components/shared/List'
import Spinner from '@/components/shared/Spinner'
import Button from '@/components/shared/Button'

import { YStack } from '@/components/shared/Stack'
import EmotionGauge from '@/app/(playground)/home/_components/EmotionGauge'
import FavoriteButton from '@/app/(playground)/home/_components/FavoriteButton'
import CommentButton from '@/app/(playground)/home/_components/CommentButton'
import AccessTypeButtonWithDropDown from '@/app/(playground)/home/_components/AccessTypeButtonWithDropDown'
import OptionButtonWithDropDown from '@/app/(playground)/home/_components/OptionButtonWithDropDown'
import Comments from '@/app/(playground)/home/_components/Comments'
import { TEmotion } from '@/app/(playground)/write/sentence/_containers/PostContainer'

interface Props {
  sentenceId: number
}

export default function SentenceContainer({ sentenceId }: Props) {
  const router = useRouter()
  const [showComment, setShowComment] = useState(true)
  const { data: sentence } = useSuspenseQuery(
    sentenceQuery.getSentence(supabase, sentenceId),
  )
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: followers } = useSuspenseQuery(
    followQuery.getFollowers(supabase, sentence?.user_id),
  )
  const isFollowing = followers?.find(
    (user) => user.follower_user_id === me?.userId,
  )
  const { mutate: follow } = useFollow()
  const { mutate: unFollow } = useUnFollow()
  const { editor } = useBlockEditor({ content: sentence?.content })
  const { mutate: favoriteSentence } = useFavoriteSentence()
  const [isLoadingFollowing, startTransitionFollowing] = useTransition()

  const handleShowComment = () => {
    setShowComment((prev) => !prev)
  }

  const handleFavoriteSentence = (e: MouseEvent) => {
    e.stopPropagation()
    me
      ? favoriteSentence({
          meId: me.userId,
          sentenceId: Number(sentenceId),
        })
      : router.push('/auth_guard')
  }

  const handleFollow = () => {
    me
      ? startTransitionFollowing(() =>
          isFollowing
            ? unFollow({
                followed_user_id: sentence.user_id,
                follower_user_id: me.userId,
              })
            : follow({
                followed_user_id: sentence.user_id,
                follower_user_id: me.userId,
              }),
        )
      : router.push('/auth_guard', { scroll: false })
  }

  if (!editor) {
    return null
  }

  if (!sentence) {
    return null
  }

  return (
    <YStack gap={8}>
      <div className="flex flex-col gap-4 rounded-md bg-white p-4 shadow-sm dark:bg-var-darkgray">
        <div className="flex items-center gap-4">
          <Avatar
            src={sentence?.user_info.avatar_url}
            size="sm"
            ring
            onClick={() => router.push(`/profile/${sentence?.user_id}`)}
          />
          <div className="flex flex-col self-end">
            <Title type="sub" size="sm">
              {sentence?.user_info.user_name}
            </Title>
            <Text type="caption">{sentence?.user_info.email}</Text>
          </div>
          <div className="flex h-full flex-1 items-end justify-end p-2">
            <EmotionGauge
              emotionLevel={sentence?.emotion_level as TEmotion}
              className="h-full"
            />
          </div>
        </div>
        <Line />
        <div>
          <Title size="lg">{sentence.title}</Title>
        </div>
        {sentence?.tags && sentence.tags.length >= 1 && (
          <List className="flex flex-wrap gap-2">
            {sentence?.tags?.map((tag, index) => <Tag key={index} tag={tag} />)}
          </List>
        )}
        <EditorContent editor={editor} />
        <div className="mt-8 flex flex-col gap-2">
          <div className="flex w-full flex-col gap-4 rounded-md bg-var-lightgray p-4 transition duration-300 hover:shadow-lg sm:flex-row dark:bg-var-dark">
            <Link
              href={`/profile/${sentence?.user_id}`}
              className="flex flex-1 gap-4"
            >
              <Avatar src={sentence?.user_info.avatar_url} size="md" />
              <div className="flex w-full flex-col gap-1">
                <Title size="sm">{sentence?.user_info.user_name}</Title>
                <Text type="caption">{sentence?.user_info.email}</Text>
                <Text>{sentence?.user_info.about_me}</Text>
              </div>
            </Link>
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex justify-center gap-2 sm:flex-col"
            >
              {me?.userId === sentence?.user_id ? (
                <>
                  <LinkButton
                    href="/write/sentence"
                    size="sm"
                    className="w-full self-end"
                  >
                    글 쓰기
                  </LinkButton>
                  <LinkButton
                    href="/edit_profile"
                    variant="secondary"
                    size="sm"
                    className="w-full self-end"
                  >
                    프로필 수정
                  </LinkButton>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    isLoading={isLoadingFollowing}
                    onClick={handleFollow}
                    className="w-full self-end"
                  >
                    {isFollowing ? '팔로우 취소' : '팔로우 하기'}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full self-end"
                  >
                    메세지 보내기
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        <Line />
        <nav className="flex items-center justify-between">
          <FavoriteButton
            favoritedUserId={sentence?.favorited_user_id}
            favoritedCount={sentence?.favorite}
            onFavorite={handleFavoriteSentence}
            meId={me?.userId}
          />
          <CommentButton
            showComment={showComment}
            onShowComment={handleShowComment}
            commentCount={sentence.comment}
          />
          <AccessTypeButtonWithDropDown accessType={sentence?.access_type} />
          <OptionButtonWithDropDown
            meId={me?.userId!}
            sentenceId={sentence.id}
            sentenceUserId={sentence.user_id}
          />
        </nav>
      </div>

      {showComment && (
        <div className="flex flex-col gap-4 rounded-md bg-white p-4 shadow-sm dark:bg-var-darkgray">
          <Suspense fallback={<Spinner size={40} />}>
            <Comments sentenceId={sentence.id} me={me} />
          </Suspense>
        </div>
        /**
         * TODO #1 무한 대댓글이 가능함 @kidboi666
         */
      )}
    </YStack>
  )
}
