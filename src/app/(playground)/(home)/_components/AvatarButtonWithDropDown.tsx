import useFollow from '@/src/services/mutates/follow/useFollow'
import useUnFollow from '@/src/services/mutates/follow/useUnFollow'
import useDataDrivenAnimation from '@/src/hooks/useStateChange'
import useOutsideClick from '@/src/hooks/useOutsideClick'
import { DropDown } from '@/src/components/shared/DropDown'
import Avatar from '@/src/components/shared/Avatar'
import { useSuspenseQuery } from '@tanstack/react-query'
import { meQuery } from '@/src/services/queries/auth/me-query'
import { supabase } from '@/src/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { routes } from '@/src/routes'
import AvatarButtonWithDropDownContent from '@/src/app/(playground)/(home)/_components/AvatarButtonWithDropDownContent'

interface Props {
  avatarUrl: string | null
  isMe: boolean
  isFollowing: boolean
  followerCount: number | null
  followingCount: number | null
  userId: string
  userName: string | null
  isLastComment?: boolean
  position?: 'bottomRight' | 'topRight' | 'topLeft' | 'bottomLeft'
}

export default function AvatarButtonWithDropDown({
  avatarUrl,
  isMe,
  isFollowing,
  followerCount,
  followingCount,
  userId,
  userName,
  position = 'topRight',
}: Props) {
  const router = useRouter()
  const { close, ref, onClick, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { mutate: follow } = useFollow()
  const { mutate: unfollow } = useUnFollow()

  const pushFollowerList = () =>
    router.push(routes.modal.follow.follower(userId), { scroll: false })
  const pushFollowingList = () =>
    router.push(routes.modal.follow.following(userId), { scroll: false })
  const handleFollowButtonClick = () => {
    me
      ? isFollowing
        ? unfollow({ followed_user_id: userId, follower_user_id: me.userId! })
        : follow({ followed_user_id: userId, follower_user_id: me.userId! })
      : router.push(routes.modal.auth.guard, { scroll: false })
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
        position={position}
        onTransitionEnd={onTransitionEnd}
      >
        <AvatarButtonWithDropDownContent
          avatarUrl={avatarUrl}
          userName={userName}
          followerCount={followerCount}
          pushFollowerList={pushFollowerList}
          followingCount={followingCount}
          pushFollowingList={pushFollowingList}
          isMe={isMe}
          onFollowButtonClick={handleFollowButtonClick}
          userId={userId}
          isFollowing={isFollowing}
        />
      </DropDown.Content>
    </DropDown.Root>
  )
}
