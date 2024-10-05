import Text from '@/components/shared/Text'
import cn from '@/lib/cn'

interface Props {
  content: any
}

export default function TextLength({ content }: Props) {
  return (
    <Text
      type="caption"
      size="xs"
      className={cn('self-end', content?.length >= 300 ? 'text-red-500' : '')}
    >
      {content?.length} / 300
    </Text>
  )
}
