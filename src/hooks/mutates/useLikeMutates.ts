'use client'

import { routes } from '@/src/routes'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'

import { supabase } from '@/src/lib/supabase/client'

import useHandleLikePost from '@/src/services/mutates/post/useHandleLikePost'
import { meQuery } from '@/src/services/queries/auth/me-query'

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
      : router.push(routes.modal.auth.guard, { scroll: false })
  }

  return { onLikePost: handleLikePost }
}
