import { postQuery } from '@/src/services/queries/post/post-query'
import { supabase } from '@/src/lib/supabase/client'
import { useSuspenseQuery } from '@tanstack/react-query'

interface Props {
  postId: number
  meId: string
}

export default function useLikeQueries({ postId, meId }: Props) {
  const { data: isLike } = useSuspenseQuery(
    postQuery.checkLiked(supabase, postId, meId),
  )

  return { isLike }
}
