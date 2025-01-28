'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import useHandleLikePost from '@/src/services/mutates/like/useHandleLikePost'
import { meQuery } from '@/src/services/queries/auth/me-query'
import { ROUTES } from '@/src/routes'

interface Props {
  postId: number
  isLiked: boolean
}

export default function useLikeMutates({ postId, isLiked }: Props): {
  onLikePost: (e: MouseEvent) => void
} {
  const router = useRouter()
  const { data: session } = useSuspenseQuery(meQuery.getSession(supabase))
  const { mutate: likeOrUnlike } = useHandleLikePost(isLiked)

  const handleLikePost = (e: MouseEvent) => {
    e.stopPropagation()
    session
      ? likeOrUnlike({
          meId: session?.userId,
          postId,
        })
      : router.push(ROUTES.MODAL.AUTH.GUARD, { scroll: false })
  }

  return { onLikePost: handleLikePost }
}
