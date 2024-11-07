import { Container } from '@/components/shared/Container'
import Line from '@/components/shared/Line'
import { YStack } from '@/components/shared/Stack'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'

interface Props {
  title: string
  content: string | number | null
  unit: string
  className?: string
}

export default function HistoryBlock({
  title,
  content,
  unit,
  className,
}: Props) {
  return (
    <Container className="flex-1 rounded-lg bg-white p-2 shadow-sm sm:p-4 dark:bg-var-darkgray">
      <YStack gap={4} className="items-center">
        <YStack gap={0}>
          <Title type="caption" size="xs">
            {title}
          </Title>
          <Line className="w-full" />
        </YStack>
        <Text size="bigger" className={className}>
          {content}
          <Text as="span">{unit}</Text>
        </Text>
      </YStack>
    </Container>
  )
}
