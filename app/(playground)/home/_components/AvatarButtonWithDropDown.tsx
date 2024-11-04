import { useTransition } from 'react'
import useFollow from '@/services/mutates/follow/useFollow'
import useUnFollow from '@/services/mutates/follow/useUnFollow'
import useDataDrivenAnimation from '@/hooks/useStateChange'
import useOutsideClick from '@/hooks/useOutsideClick'
import { DropDown } from '@/components/shared/DropDown'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import Avatar from '@/components/shared/Avatar'
import { useSuspenseQuery } from '@tanstack/react-query'
import { meQuery } from '@/services/queries/auth/meQuery'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface Props {
  avatarUrl: string | null
  isMe: boolean
  isFollowing: boolean
  followers: any
  followings: any
  userId: string
  meId: string | null
  userName: string | null
}

export default function AvatarButtonWithDropDown({
  avatarUrl,
  isMe,
  isFollowing,
  followers,
  followings,
  userId,
  meId,
  userName,
}: Props) {
  const router = useRouter()
  const { close, ref, onClick, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { mutate: follow } = useFollow()
  const { mutate: unfollow } = useUnFollow()
  const [isLoadingFollowing, startTransitionFollowing] = useTransition()

  const handleFollowButtonClick = () => {
    me
      ? isFollowing
        ? unfollow({ followed_user_id: userId, follower_user_id: meId! })
        : follow({ followed_user_id: userId, follower_user_id: meId! })
      : router.push('/auth_guard')
  }
  return (
    <DropDown.Root>
      <DropDown.Trigger
        targetRef={buttonRef}
        variant="none"
        onClick={onClick}
        className="p-0"
      >
        <Avatar src={avatarUrl} size="sm" shadow="sm" />
      </DropDown.Trigger>
      <DropDown.Content
        ref={ref}
        initStatus="closed"
        position="bottomRight"
        onTransitionEnd={onTransitionEnd}
      >
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col items-center gap-2">
            <Avatar src={avatarUrl} size="sm" hoverEffect="none" />
            <Title type="sub" size="sm">
              {userName}
            </Title>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <Text type="caption" size="sm">
                팔로우{' '}
                {followers && followers.length >= 1 ? followers.length : 0}명
              </Text>
              <Text type="caption" size="sm">
                팔로잉{' '}
                {followings && followings.length >= 1 ? followings.length : 0}명
              </Text>
            </div>
            <div className="flex gap-4">
              {isMe ? (
                <>
                  <DropDown.LinkButton href="/edit_profile" variant="secondary">
                    프로필 수정
                  </DropDown.LinkButton>
                  <DropDown.LinkButton href={`/profile/${userId}`}>
                    마이 페이지
                  </DropDown.LinkButton>
                </>
              ) : (
                <>
                  <DropDown.Button
                    variant="secondary"
                    isLoading={isLoadingFollowing}
                    onClick={() =>
                      startTransitionFollowing(() => handleFollowButtonClick())
                    }
                  >
                    {isFollowing ? '팔로우 취소' : '팔로우 하기'}
                  </DropDown.Button>
                  <DropDown.LinkButton href={`/profile/${userId}`}>
                    프로필 페이지
                  </DropDown.LinkButton>
                </>
              )}
            </div>
          </div>
        </div>
      </DropDown.Content>
    </DropDown.Root>
  )
}
