'use client'

import useHandleLikePost from '@/src/services/mutates/post/useHandleLikePost'
import { MouseEvent } from 'react'
import { routes } from '@/src/routes'
import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'
import { postQuery } from '@/src/services/queries/post/post-query'
import { supabase } from '@/src/lib/supabase/client'
import { IUserInfoWithMBTI } from '@/src/types/auth'

interface Props {
  postId: number
  me: IUserInfoWithMBTI
}

export default function useLikeActions({ postId, me }: Props): {
  isLike: boolean | null
  onLikePost: (e: MouseEvent) => void
} {
  const router = useRouter()
  const { data: isLike } = useSuspenseQuery(
    postQuery.checkLiked(supabase, postId, me.id),
  )
  const { mutate: likeOrUnlike } = useHandleLikePost(isLike)

  const handleLike = () => {
    likeOrUnlike({
      meId: me.id,
      postId,
    })
  }

  const handleLikePost = (e: MouseEvent) => {
    e.stopPropagation()
    me ? handleLike() : router.push(routes.modal.auth.guard, { scroll: false })
  }

  return { isLike, onLikePost: handleLikePost }
}
