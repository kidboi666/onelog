import Avatar from '@/components/feature/user/Avatar'
import Box from '@/components/shared/Box'
import Button from '@/components/shared/Button'
import Container from '@/components/shared/Container'
import Icon from '@/components/shared/Icon'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { Tables } from '@/types/supabase'
import { useState } from 'react'
import CommentContainer from './_components/comment'
import FavoriteButton from '../button/FavoriteButton'
import CommentButton from '../button/CommentButton'

interface Props {
  sentence: Tables<'sentence'>
  userId: string
  onFavoriteSentence: (sentenceId: number) => void
}

export default function Sentence({
  sentence,
  userId,
  onFavoriteSentence,
}: Props) {
  const [showComment, setShowComment] = useState(false)

  const handleShowComment = () => {
    setShowComment((prev) => !prev)
  }

  return (
    <>
      <Container key={sentence.id} className="my-4 flex flex-col gap-4">
        <Box row className="gap-2">
          <Avatar src={sentence?.avatar_url!} size="sm" />
          <Box col>
            <Title size="xs" type="sub">
              {sentence?.user_name}
              <Text as="span" size="sm" type="caption">
                {' '}
                님의 하루 한줄
              </Text>
            </Title>
            <Text size="sm">
              감정 농도
              <Text as="span" className="text-var-blue opacity-50">
                {' '}
                {sentence.emotion_level}
              </Text>
            </Text>
          </Box>
        </Box>
        <Box col>
          <Box
            isBackground
            isRounded
            col
            className="gap-4 p-4 shadow-sm transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
          >
            <Text>{sentence.content}</Text>
            <Box row className="flex-1">
              <FavoriteButton
                sentence={sentence}
                onFavoriteSentence={onFavoriteSentence}
                userId={userId}
              />
              <CommentButton onShowComment={handleShowComment} />
            </Box>
          </Box>
        </Box>
        {showComment && <CommentContainer sentenceId={sentence?.id} />}
      </Container>
    </>
  )
}
