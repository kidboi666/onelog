import { YStack } from '@/components/shared/Stack'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { formatDateElapsed } from '@/utils/formatDate'

interface Props {
  userName: string | null
  email: string | null
  createdAt: string
  postType: 'journal' | 'article'
}

export default function NameWithDateSection({
  userName,
  email,
  createdAt,
  postType,
}: Props) {
  return (
    <YStack gap={0} className="flex-1 justify-between">
      <Title size="xs" type="sub" className="line-clamp-1">
        {userName}
      </Title>
      <Text type="caption" size="sm">
        @{email?.split('@')[0]} · {formatDateElapsed(createdAt)} ·{' '}
        {postType === 'journal' ? '감정 일기' : '아티클'}
      </Text>
    </YStack>
  )
}
