import Avatar from '@/components/feature/user/Avatar'
import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import useFavoriteComment from '@/services/mutates/comment/useFavoriteComment'
import { commentQuery } from '@/services/queries/comment/commentQuery'
import { Tables } from '@/types/supabase'
import { formatDateToYMD } from '@/utils/formatDate'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'
import FavoriteButton from '../../../button/FavoriteButton'
import CommentButton from '../../../button/CommentButton'

interface Props {
  comment: Tables<'comment'>
}

export default function CommentItem({ comment }: Props) {
  const [showComment, setShowComment] = useState(false)
  const me = getQueryClient().getQueryData<Tables<'user_info'>>(['me', 'info'])
  const { data: commentToComments } = useSuspenseQuery(
    commentQuery.getCommentToComment(supabase, comment?.id),
  )
  const { mutate: favoriteComment } = useFavoriteComment()

  const handleShowComment = () => {
    setShowComment((prev) => !prev)
  }

  const handleFavoriteComment = (commentId: number) => {
    favoriteComment({ commentId, userId: me?.id! })
  }

  return (
    <Container className="flex w-full gap-2">
      <Avatar src={me?.avatar_url} size="sm" />
      <Box col className="gap-2">
        <Box>
          <Title size="xs" type="sub">
            {comment.user_name}
            <Text as="span" type="caption" size="sm">
              {' '}
              님의 댓글
            </Text>
          </Title>
          <Text type="caption" size="sm">
            {formatDateToYMD(comment.created_at)}
          </Text>
        </Box>
        <Box isBackground isRounded className="w-fit p-4">
          <Text>{comment.content}</Text>
        </Box>
        <Box row className="flex-1">
          <FavoriteButton
            item={comment}
            onFavorite={handleFavoriteComment}
            userId={me?.id!}
          />
          <CommentButton onShowComment={handleShowComment} />
        </Box>
        {showComment &&
          commentToComments.length >= 1 &&
          commentToComments.map((comment) => <CommentItem comment={comment} />)}
      </Box>
    </Container>
  )
}
