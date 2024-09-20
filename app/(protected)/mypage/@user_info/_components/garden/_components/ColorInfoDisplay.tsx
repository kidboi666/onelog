import Text from '@/components/shared/Text'
import Block from './Block'

interface Props {
  orderBy: string
}

export default function ColorInfoDisplay({ orderBy }: Props) {
  return (
    <div className="flex items-center gap-2 self-end">
      <Text type="caption" size="sm" className="leading-none">
        {orderBy === 'emotion' ? 'Bad' : 'Less'}
      </Text>
      <Block disabled />
      <Block disabled length={1} />
      <Block disabled length={2} />
      <Block disabled length={3} />
      <Block disabled length={4} />
      <Text type="caption" size="sm">
        {orderBy === 'emotion' ? 'Good' : 'More'}
      </Text>
    </div>
  )
}
