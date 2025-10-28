'use client'

import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
import { useMe } from '@/src/store/hooks/useMe'
import useHandleLikePost from '@/src/services/mutates/like/useHandleLikePost'
import { ROUTES } from '@/src/routes'

interface Props {
  postId: number
  isLike: boolean
}

export default function useLikeMutates({ postId, isLike }: Props): {
  onLikePost: (e: MouseEvent) => void
} {
  const router = useRouter()
  const { me } = useMe()
  const { mutate: likeOrUnlike } = useHandleLikePost()

  const handleLikePost = (e: MouseEvent) => {
    e.stopPropagation()
    me
      ? likeOrUnlike({
          meId: me?.id,
          postId,
          isLike,
        })
      : router.push(ROUTES.MODAL.AUTH.GUARD, { scroll: false })
  }

  return { onLikePost: handleLikePost }
}
