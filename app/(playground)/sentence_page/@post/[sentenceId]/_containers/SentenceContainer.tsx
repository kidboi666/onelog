'use client'

import Link from 'next/link'
import { MouseEvent, Suspense, useState, useTransition } from 'react'
import { EditorContent } from '@tiptap/react'
import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { meQuery } from '@/services/queries/auth/meQuery'
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
import Spinner from '@/components/shared/Spinner'
import Button from '@/components/shared/Button'

import { XStack, YStack } from '@/components/shared/Stack'
import EmotionGauge from '@/app/(playground)/home/_components/EmotionGauge'
import FavoriteButton from '@/app/(playground)/home/_components/FavoriteButton'
import CommentButton from '@/app/(playground)/home/_components/CommentButton'
import AccessTypeButtonWithDropDown from '@/app/(playground)/home/_components/AccessTypeButtonWithDropDown'
import OptionButtonWithDropDown from '@/app/(playground)/home/_components/OptionButtonWithDropDown'
import Comments from '@/app/(playground)/home/_components/Comments'
import ReportButton from '@/app/(playground)/home/_components/ReportButton'
import useLikeSentence from '@/services/mutates/sentence/useLikeSentence'
import useUnlikeSentence from '@/services/mutates/sentence/useUnlikeSentence'
import { formatDateToHM, formatDateToMDY } from '@/utils/formatDate'
import AvatarButtonWithDropDown from '@/app/(playground)/home/_components/AvatarButtonWithDropDown'
import { countFollowQuery } from '@/services/queries/follow/countFollowQuery'
import { TEmotion } from '@/app/(playground)/write/page'

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
  const { data: isLiked } = useSuspenseQuery(
    sentenceQuery.checkLiked(supabase, sentenceId, me?.userId),
  )
  const { data: followerCount } = useSuspenseQuery(
    countFollowQuery.countFollower(supabase, sentence.user_id),
  )
  const { data: followingCount } = useSuspenseQuery(
    countFollowQuery.countFollowing(supabase, sentence.user_id),
  )
  const { data: followers } = useSuspenseQuery(
    followQuery.getFollower(supabase, sentence?.user_id),
  )
  const isFollowing = followers?.find(
    (user) => user.follower_user_id === me?.userId,
  )
  const isMe = me?.userId === sentence.user_id
  const { mutate: follow } = useFollow()
  const { mutate: unFollow } = useUnFollow()
  const { editor } = useBlockEditor({ content: sentence?.content })
  const { mutate: like } = useLikeSentence()
  const { mutate: unlike } = useUnlikeSentence()
  const [isLoadingFollowing, startTransitionFollowing] = useTransition()
  const isOwner = me?.userId === sentence?.user_id
  const handleShowComment = () => {
    setShowComment((prev) => !prev)
  }

  const handleFavorite = () => {
    isLiked
      ? like({
          meId: me?.userId,
          sentenceId: sentenceId,
        })
      : unlike({ meId: me?.userId, sentenceId })
  }

  const handleFavoriteSentence = (e: MouseEvent) => {
    e.stopPropagation()
    me ? handleFavorite() : router.push('/auth_guard')
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
      <YStack className="rounded-md bg-white p-2 shadow-sm sm:gap-4 sm:p-4 dark:bg-var-darkgray">
        <XStack gap={4} className="items-center">
          <AvatarButtonWithDropDown
            isMe={isMe}
            userId={sentence?.user_id}
            userName={sentence?.user_info.user_name}
            avatarUrl={sentence?.user_info.avatar_url}
            followerCount={followerCount}
            followingCount={followingCount}
            isFollowing={isFollowing}
          />
          <YStack gap={0} className="self-end">
            <XStack gap={1} className="items-end">
              <Title size="xs" type="sub">
                {sentence?.user_info.user_name}
              </Title>
              <Text as="span" type="caption" size="sm">
                · @{sentence?.user_info.email?.split('@')[0]}
              </Text>
            </XStack>
            <Text type="caption" size="sm">
              {formatDateToMDY(sentence.created_at)} ·{' '}
              {formatDateToHM(sentence.created_at)}
            </Text>
          </YStack>
          <XStack className="h-full flex-1 items-end justify-end p-2">
            <EmotionGauge
              emotionLevel={sentence?.emotion_level as TEmotion}
              className="h-full"
            />
          </XStack>
        </XStack>
        <Line />
        <YStack>
          {sentence.title && (
            <Title size="lg" className="my-4">
              {sentence.title}
            </Title>
          )}
          <EditorContent editor={editor} />
          {sentence?.tags && sentence.tags.length >= 1 && (
            <XStack className="flex-wrap">
              {sentence?.tags?.map((tag, index) => (
                <Tag key={index} tag={tag} />
              ))}
            </XStack>
          )}
        </YStack>
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
                    href="/write"
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
        <YStack className="sm:hidden">
          <Line />
          <nav className="flex items-center justify-between">
            <FavoriteButton
              isLiked={isLiked}
              favoritedCount={sentence?.like[0].count}
              onFavorite={handleFavoriteSentence}
              meId={me?.userId}
              viewToolTip
            />
            <CommentButton
              viewToolTip
              showComment={showComment}
              onShowComment={handleShowComment}
              commentCount={sentence.comment}
            />
            <AccessTypeButtonWithDropDown
              accessType={sentence?.access_type}
              viewToolTip
            />
            <ReportButton viewToolTip />
            {isOwner && (
              <OptionButtonWithDropDown
                isOwner={isOwner}
                sentenceId={sentence.id}
              />
            )}
          </nav>
        </YStack>
      </YStack>

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
