import { Suspense, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { EditorContent } from '@tiptap/react'
import useBlockEditor from '@/hooks/useBlockEditor'
import { supabase } from '@/lib/supabase/client'
import cn from '@/lib/cn'
import { meQuery } from '@/services/queries/auth/meQuery'
import useFavoriteSentence from '@/services/mutates/sentence/useFavoriteSentence'
import { Tables } from '@/types/supabase'
import { formatDateToHM, formatDateToYMD } from '@/utils/formatDate'
import Spinner from '@/components/shared/Spinner'
import Tag from '@/components/shared/Tag'
import { List } from '@/components/shared/List'
import Avatar from '@/components/feature/user/Avatar'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import FavoriteButton from '../button/FavoriteButton'
import CommentButton from '../button/CommentButton'
import Comments from '../comment/Comments'

interface Props {
  sentence: Tables<'sentence'>
  userId: string
}

export default function SentenceItem({ sentence, userId }: Props) {
  const [showComment, setShowComment] = useState(false)
  const { data: me } = useSuspenseQuery(meQuery.getUserInfo(supabase, userId))
  const { editor } = useBlockEditor({ content: sentence.content })
  const { mutate: favoriteSentence } = useFavoriteSentence()
  const tags = sentence.tags

  if (!sentence) return null

  const handleFavoriteSentence = (sentenceId: number) => {
    favoriteSentence({ userId, sentenceId })
  }
  const handleShowComment = () => {
    setShowComment((prev) => !prev)
  }

  return (
    <div key={sentence.id} className={cn('my-4 flex flex-col gap-4')}>
      <div className="flex gap-2">
        <Avatar src={sentence?.avatar_url!} size="sm" shadow="sm" />
        <div className="flex flex-col">
          <Title size="xs" type="sub">
            {sentence?.user_name}
            <Text as="span" size="sm" type="caption">
              {' '}
              님의 하루 한줄
            </Text>
          </Title>
          <div className="flex items-center gap-2">
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
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-4 rounded-md bg-white p-4 shadow-sm transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg dark:bg-var-darkgray">
          {tags?.length! > 0 && (
            <List className="flex flex-wrap gap-2">
              {tags?.map((tag, idx) => <Tag key={idx} tag={tag} />)}
            </List>
          )}
          <EditorContent editor={editor} />
          <div className="flex flex-1">
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
          </div>
        </div>
      </div>
      {showComment && (
        <Suspense fallback={<Spinner size={40} />}>
          <Comments sentenceId={sentence?.id} me={me} />
        </Suspense>
      )}
    </div>
  )
}
