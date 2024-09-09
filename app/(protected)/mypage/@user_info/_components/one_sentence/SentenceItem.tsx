import { formatDateToHM, formatDateToYMD } from '@/utils/formatDate'
import Text from '@/components/shared/Text'
import { List } from '@/components/shared/List'
import Box from '@/components/shared/Box'
import { useRouter } from 'next/navigation'
import Favorite from './Favorite'
import Comment from './Comment'
import Emotion from './Emotion'
import { ISentenceState } from '@/store/useSentence'

interface Props {
  sentence: ISentenceState
}

export default function SentenceItem({ sentence }: Props) {
  const router = useRouter()
  const level = sentence?.emotion_level.split('%')
  return (
    <List.Row
      onClick={() => router.push(`/sentence_info/${sentence?.id}`)}
      className="flex cursor-pointer items-center justify-between gap-4 truncate rounded-md px-1 py-2 transition hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <Text type="caption" size="xs">
        {formatDateToYMD(sentence?.created_at)} ·
        {formatDateToHM(sentence?.created_at)}
      </Text>
      <Text size="sm" className="flex-1 truncate">
        {sentence?.content}
      </Text>
      <Box row className="gap-2">
        <Emotion level={Number(level[0])} />
        <Box row className="gap-2 max-sm:hidden">
          <Favorite count={sentence?.favorite ?? 0} />
          <Comment count={sentence?.comment?.length ?? 0} />
        </Box>
      </Box>
    </List.Row>
  )
}
