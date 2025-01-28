import { QUERY_KEY } from '@/src/constants/query-key'
import { useEffect, useState } from 'react'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { IComment } from '@/src/types/comment'
import { IPostDetail } from '@/src/types/post'
import { sortByDate } from '@/src/utils/client-utils'

export default function useCommentReplies(commentId: number, postId: number) {
  const [replies, setReplies] = useState<IComment[]>([])

  useEffect(() => {
    if (commentId) {
      const queryClient = getQueryClient()
      const cachedPost = queryClient.getQueryData<IPostDetail>(
        QUERY_KEY.POST.DETAIL(postId),
      )

      if (!cachedPost) return

      const filteredComments = cachedPost.comments.filter(
        (v) => v.commentId === commentId,
      )
      setReplies(sortByDate(filteredComments))
    }
  }, [commentId, postId])

  return replies
}
