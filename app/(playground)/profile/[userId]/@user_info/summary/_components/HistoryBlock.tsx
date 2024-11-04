import Line from '@/components/shared/Line'
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
    <div className="flex flex-1 flex-col items-center gap-4 rounded-lg bg-white p-4 shadow-md dark:bg-var-darkgray">
      <Title type="caption" size="xs">
        {title}
      </Title>
      <Line className="w-full" />
      <Text size="bigger" className={className}>
        {content}
        <Text as="span">{unit}</Text>
      </Text>
    </div>
  )
}
