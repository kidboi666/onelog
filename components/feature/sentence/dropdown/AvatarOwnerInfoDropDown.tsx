import Button from '@/components/shared/Button'
import Text from '@/components/shared/Text'
import { RefObject, useTransition } from 'react'
import Title from '@/components/shared/Title'
import Avatar from '@/components/feature/user/Avatar'
import LinkButton from '@/components/shared/LinkButton'
import useFollow from '@/services/mutates/follow/useFollow'
import useUnFollow from '@/services/mutates/follow/useUnFollow'
import Spinner from '@/components/shared/Spinner'

interface Props {
  targetRef: RefObject<HTMLDivElement>
  onTransitionEnd: () => void
  avatarUrl: string | null
  userName: string | null
  userId: string
  meId: string
  followers: any
  followings: any
  isMe: boolean
  isFollowing: boolean
}

export default function AvatarOwnerInfoDropDown({
  targetRef,
  onTransitionEnd,
  avatarUrl,
  userName,
  userId,
  meId,
  followers,
  followings,
  isMe,
  isFollowing,
}: Props) {
  const { mutate: follow } = useFollow()
  const { mutate: unfollow } = useUnFollow()
  const [isLoadingFollowing, startTransitionFollowing] = useTransition()

  const handleFollowButtonClick = () => {
    isFollowing
      ? unfollow({ followed_user_id: userId, follower_user_id: meId })
      : follow({ followed_user_id: userId, follower_user_id: meId })
  }

  return (
    <div
      ref={targetRef}
      data-status="closed"
      onTransitionEnd={onTransitionEnd}
      className="absolute left-0 top-full z-30 hidden size-fit origin-top transition data-[status=closed]:scale-95 data-[status=closed]:opacity-0"
    >
      <div className="flex flex-col gap-4 text-nowrap rounded-md bg-white p-4 shadow-lg dark:bg-var-darkgray">
        <div className="flex flex-col items-center gap-2">
          <Avatar src={avatarUrl} size="sm" hoverEffect="none" />
          <Title type="sub" size="sm">
            {userName}
          </Title>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            <Text type="caption" size="sm">
              팔로우 {followers && followers.length >= 1 ? followers.length : 0}
              명
            </Text>
            <Text type="caption" size="sm">
              팔로잉{' '}
              {followings && followings.length >= 1 ? followings.length : 0}명
            </Text>
          </div>
          {isMe ? (
            <div className="flex gap-2">
              <LinkButton href="/edit_profile" size="sm" variant="secondary">
                프로필 수정
              </LinkButton>
              <LinkButton href={`/${userId}`} size="sm">
                마이 페이지
              </LinkButton>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleFollowButtonClick}
              >
                {isFollowing ? (
                  isLoadingFollowing ? (
                    <Spinner size={16} />
                  ) : (
                    '팔로우 취소'
                  )
                ) : isLoadingFollowing ? (
                  <Spinner size={16} />
                ) : (
                  '팔로우 하기'
                )}
              </Button>
              <LinkButton href={`/${userId}`} size="sm">
                프로필 페이지
              </LinkButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
