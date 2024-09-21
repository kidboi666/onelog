import { formatDateToHM } from '@/utils/formatDate'
import Text from '@/components/shared/Text'
import { List } from '@/components/shared/List'
import { useRouter } from 'next/navigation'
import Favorite from './Favorite'
import Comment from './Comment'
import Emotion from './Emotion'
import { ISentenceState } from '@/store/useSentence'
import { useTransition } from 'react'

interface Props {
  sentence: ISentenceState
}

export default function SentenceItem({ sentence }: Props) {
  const router = useRouter()
  const level = sentence?.emotion_level.split('%')
  const [isLoading, startTransition] = useTransition()

  return (
    <List.Row
      onClick={() =>
        startTransition(() =>
          router.push(`/sentence_info/${sentence?.id}`, { scroll: false }),
        )
      }
      className="flex cursor-pointer items-center justify-between gap-4 truncate rounded-md px-1 py-2 transition hover:bg-var-lightgray dark:hover:bg-var-dark"
    >
      <Text type="caption" size="xs">
        {formatDateToHM(sentence?.created_at)}
      </Text>
      <Text size="sm" className="flex-1 truncate">
        {sentence?.content}
      </Text>
      <div className="flex gap-2">
        <Emotion level={Number(level[0])} />
        <div className="flex gap-2 max-sm:hidden">
          <Favorite count={sentence?.favorite ?? 0} />
          <Comment count={sentence?.comment?.length ?? 0} />
        </div>
      </div>
    </List.Row>
  )
}
