import Button from '@/src/components/shared/Button'
import { routes } from '@/src/routes'
import { XStack } from '@/src/components/shared/Stack'
import useTransitionWithRoute from '@/src/hooks/useTransitionWithRoute'
import useFetchWithDelay from '@/src/hooks/useFetchWithDelay'
import useFollowActions from '@/src/hooks/actions/useFollowActions'
import { IUserInfoWithMBTI } from '@/src/types/auth'

interface Props {
  me: IUserInfoWithMBTI
  isFollowing: boolean
  userId: string
}

export default function RenderActionButtonFromAuthorInfo({
  me,
  isFollowing,
  userId,
}: Props) {
  const { onFollow, isPendingFollow, isPendingUnfollow } = useFollowActions({
    me,
    isFollowing,
    userId,
  })

  const [isLoadingWrite, startTransitionWrite] = useTransitionWithRoute()
  const [isLoadingEditProfile, startTransitionEditProfile] =
    useTransitionWithRoute()

  const isPending = useFetchWithDelay(isPendingFollow || isPendingUnfollow)

  return (
    <XStack
      onClick={(e) => e.stopPropagation()}
      className="flex-col justify-center"
    >
      {me?.id === userId ? (
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
            onClick={() => startTransitionEditProfile(routes.profile.edit)}
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
            onClick={onFollow}
            className="w-full self-end"
          >
            {isFollowing ? '팔로우 취소' : '팔로우 하기'}
          </Button>
          <Button variant="secondary" size="sm" className="w-full self-end">
            메세지 보내기
          </Button>
        </>
      )}
    </XStack>
  )
}
