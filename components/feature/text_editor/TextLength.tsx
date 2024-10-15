import Text from '@/components/shared/Text'
import cn from '@/lib/cn'

interface Props {
  content: number
}

export default function TextLength({ content }: Props) {
  return (
    <Text
      type="caption"
      size="xs"
      className={cn(
        'self-end',
        content >= 300 ? 'text-red-500 dark:text-red-500' : '',
      )}
    >
      {content}
    </Text>
  )
}
