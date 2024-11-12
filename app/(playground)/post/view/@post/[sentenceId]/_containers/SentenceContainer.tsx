'use client'

import Link from 'next/link'
import { MouseEvent, Suspense, useState } from 'react'
import { EditorContent } from '@tiptap/react'
import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import useFollow from '@/services/mutates/follow/useFollow'
import useUnFollow from '@/services/mutates/follow/useUnFollow'
import { followQuery } from '@/services/queries/follow/followQuery'
import { countFollowQuery } from '@/services/queries/follow/countFollowQuery'
import useLikeSentence from '@/services/mutates/sentence/useLikeSentence'
import useUnlikeSentence from '@/services/mutates/sentence/useUnlikeSentence'
import useBlockEditor from '@/hooks/useBlockEditor'
import useMe from '@/hooks/useMe'
import useFetchWithDelay from '@/hooks/useFetchWithDelay'
import useTransitionWithRoute from '@/hooks/useTransitionWithRoute'
import { formatDateToHM, formatDateToMDY } from '@/utils/formatDate'
import { TEmotion } from '@/app/(playground)/post/edit/page'
import { routes } from '@/routes'

import Avatar from '@/components/shared/Avatar'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import Line from '@/components/shared/Line'
import Tag from '@/components/shared/Tag'
import Spinner from '@/components/shared/Spinner'
import Button from '@/components/shared/Button'
import { XStack, YStack } from '@/components/shared/Stack'

import EmotionGauge from '@/app/(playground)/home/_components/EmotionGauge'
import LikeButton from '@/app/(playground)/home/_components/LikeButton'
import CommentButton from '@/app/(playground)/home/_components/CommentButton'
import AccessTypeButtonWithDropDown from '@/app/(playground)/home/_components/AccessTypeButtonWithDropDown'
import OptionButtonWithDropDown from '@/app/(playground)/home/_components/OptionButtonWithDropDown'
import Comments from '@/app/(playground)/home/_components/Comments'
import ReportButton from '@/app/(playground)/home/_components/ReportButton'
import AvatarButtonWithDropDown from '@/app/(playground)/home/_components/AvatarButtonWithDropDown'
import ShareButton from '@/app/(playground)/home/_components/ShareButton'

interface Props {
  sentenceId: number
}

export default function SentenceContainer({ sentenceId }: Props) {
  const router = useRouter()
  const [showComment, setShowComment] = useState(true)
  const { data: sentence } = useSuspenseQuery(
    sentenceQuery.getSentence(supabase, sentenceId),
  )
  const { me } = useMe()
  const { data: isLiked } = useSuspenseQuery(
    sentenceQuery.checkLiked(supabase, sentenceId, me?.id),
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
    (user) => user.follower_user_id === me?.id,
  )
  const isMe = me?.id === sentence.user_id
  const { mutate: follow, isPending: isPendingFollow } = useFollow()
  const { mutate: unfollow, isPending: isPendingUnfollow } = useUnFollow()
  const { editor } = useBlockEditor({ content: sentence?.content })
  const { mutate: like } = useLikeSentence()
  const { mutate: unlike } = useUnlikeSentence()
  const isPending = useFetchWithDelay(isPendingFollow || isPendingUnfollow)
  const isOwner = me?.id === sentence?.user_id
  const [isLoadingWrite, startTransitionWrite] = useTransitionWithRoute()
  const [isLoadingEditProfile, startTransitionEditProfile] =
    useTransitionWithRoute()

  const handleShowComment = () => {
    setShowComment((prev) => !prev)
  }

  const handleLike = () => {
    isLiked
      ? unlike({ meId: me?.id, sentenceId })
      : like({
          meId: me?.id,
          sentenceId: sentenceId,
        })
  }

  const handleLikeSentence = (e: MouseEvent) => {
    e.stopPropagation()
    me ? handleLike() : router.push(routes.modal.auth.guard, { scroll: false })
  }

  const handleFollow = () => {
    me
      ? isFollowing
        ? unfollow({
            followed_user_id: sentence.user_id,
            follower_user_id: me.id,
          })
        : follow({
            followed_user_id: sentence.user_id,
            follower_user_id: me.id,
          })
      : router.push(routes.modal.auth.guard, { scroll: false })
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
            position="bottomRight"
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
        <YStack className="mt-8">
          <YStack
            gap={4}
            className="w-full rounded-md bg-var-lightgray p-4 transition duration-300 hover:shadow-lg sm:flex-row dark:bg-var-dark"
          >
            <Link
              href={routes.profile.view(sentence?.user_id)}
              className="flex flex-1 gap-4"
            >
              <Avatar src={sentence?.user_info.avatar_url} size="md" />
              <YStack gap={1} className="w-full">
                <Title size="sm">{sentence?.user_info.user_name}</Title>
                <Text type="caption">{sentence?.user_info.email}</Text>
                <Text>{sentence?.user_info.about_me}</Text>
              </YStack>
            </Link>
            <XStack
              onClick={(e) => e.stopPropagation()}
              className="justify-center sm:flex-col"
            >
              {me?.id === sentence?.user_id ? (
                <>
                  <Button
                    size="sm"
                    isLoading={isLoadingWrite}
                    onClick={() => startTransitionWrite(routes.post.new)}
                    className="w-full self-end"
                  >
                    글 쓰기
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      startTransitionEditProfile(routes.profile.edit)
                    }
                    isLoading={isLoadingEditProfile}
                    className="w-full self-end"
                  >
                    프로필 수정
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    isLoading={isPending}
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
            </XStack>
          </YStack>
        </YStack>
        <YStack className="sm:hidden">
          <Line />
          <XStack gap={0} className="items-center justify-between">
            <LikeButton
              isLiked={isLiked}
              likedCount={sentence?.like[0].count}
              onLike={handleLikeSentence}
              meId={me?.id}
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
            <ShareButton viewToolTip />
            <ReportButton viewToolTip sentenceId={sentenceId} />
            {isOwner && (
              <OptionButtonWithDropDown
                isOwner={isOwner}
                sentenceId={sentence.id}
              />
            )}
          </XStack>
        </YStack>
      </YStack>

      {showComment && (
        <YStack
          gap={4}
          className="rounded-md bg-white p-4 shadow-sm dark:bg-var-darkgray"
        >
          <Suspense
            fallback={
              <Spinner.Container>
                <Spinner size={40} />
              </Spinner.Container>
            }
          >
            <Comments sentenceId={sentence.id} me={me} />
          </Suspense>
        </YStack>
        /**
         * TODO #1 무한 대댓글이 가능함 @kidboi666
         */
      )}
    </YStack>
  )
}
