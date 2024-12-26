'use client'

import useDataDrivenAnimation from '@/src/hooks/useStateChange'
import useOutsideClick from '@/src/hooks/useOutsideClick'
import { DropDown } from '@/src/components/shared/DropDown'
import Avatar from '@/src/components/shared/Avatar'
import { routes } from '@/src/routes'
import AvatarButtonWithDropDownContent from '@/src/app/(playground)/(home)/_components/AvatarButtonWithDropDownContent'
import useMe from '@/src/hooks/useMe'
import useFollowQueries from '@/src/hooks/query/useFollowQueries'
import useFollowActions from '@/src/hooks/actions/useFollowActions'
import useRouterPush from '@/src/hooks/useRouterPush'

interface Props {
  avatarUrl: string | null
  userId: string
  userName: string | null
  position?: 'bottomRight' | 'topRight' | 'topLeft' | 'bottomLeft'
}

export default function AvatarButtonWithDropDown({
  avatarUrl,
  userId,
  userName,
  position = 'topRight',
}: Props) {
  const { close, ref, onClick, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)
  const { me } = useMe()
  const authGuard = useRouterPush(routes.modal.auth.guard, false)
  const { followingCount, followerCount, isFollowing, isMe } = useFollowQueries(
    {
      userId,
      meId: me?.id,
    },
  )
  const { onFollow, pushFollowingList, pushFollowerList } = useFollowActions({
    isFollowing,
    me,
    userId,
  })

  const handleFollowButtonClick = () => {
    me ? onFollow() : authGuard()
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
