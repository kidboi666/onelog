import Avatar from '@/components/feature/user/Avatar'
import Box from '@/components/shared/Box'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { Tables } from '@/types/supabase'
import { Suspense, useState } from 'react'
import CommentContainer from './_components/comment'
import FavoriteButton from '../button/FavoriteButton'
import CommentButton from '../button/CommentButton'
import useFavoriteSentence from '@/services/mutates/sentence/useFavoriteSentence'
import { formatDateToHM, formatDateToYMD } from '@/utils/formatDate'
import Spinner from '@/components/shared/Spinner'
import useIntersect from '@/hooks/useIntersect'
import RefContainer from '@/components/shared/RefContainer'
import cn from '@/lib/cn'

interface Props {
  sentence: Tables<'sentence'>
  userId: string
}

export default function Sentence({ sentence, userId }: Props) {
  const [showComment, setShowComment] = useState(false)
  const [ref, inView] = useIntersect<HTMLDivElement>({ threshold: 0.2 }, true)
  const { mutate: favoriteSentence } = useFavoriteSentence()

  const handleFavoriteSentence = (sentenceId: number) => {
    favoriteSentence({ userId, sentenceId })
  }
  const handleShowComment = () => {
    setShowComment((prev) => !prev)
  }

  return (
    <>
      <RefContainer
        ref={ref}
        key={sentence.id}
        className={cn('my-4 flex flex-col gap-4', inView ? 'animate-' : '')}
      >
        <Box row className="gap-2">
          <Avatar src={sentence?.avatar_url!} size="sm" shadow="sm" />
          <Box col>
            <Title size="xs" type="sub">
              {sentence?.user_name}
              <Text as="span" size="sm" type="caption">
                {' '}
                님의 하루 한줄
              </Text>
            </Title>
            <Box row className="items-center gap-2">
              <Text size="sm">
                감정 농도
                <Text as="span" className="text-var-blue opacity-50">
                  {' '}
                  {sentence.emotion_level}
                </Text>
              </Text>
              <Text as="span" size="sm" type="caption">
                {' '}
                {formatDateToYMD(sentence.created_at)}
                {' ・ '}
                {formatDateToHM(sentence.created_at)}
              </Text>
            </Box>
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
                item={sentence}
                onFavorite={handleFavoriteSentence}
                userId={userId}
              />
              <CommentButton
                showComment={showComment}
                commentCount={sentence.comment!}
                onShowComment={handleShowComment}
              />
            </Box>
          </Box>
        </Box>
        {showComment && (
          <Suspense fallback={<Spinner size={40} />}>
            <CommentContainer sentenceId={sentence?.id} />
          </Suspense>
        )}
      </RefContainer>
    </>
  )
}
