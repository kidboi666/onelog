import Button from '@/components/shared/Button'
import Container from '@/components/shared/Container'

interface Props {
  orderBy: string
  onSortOrder: (order: 'emotion' | 'length') => void
}

export default function SortOptionMenu({ orderBy, onSortOrder }: Props) {
  return (
    <Container className="flex gap-2">
      <Button
        size="sm"
        variant={orderBy === 'length' ? 'primary' : 'secondary'}
        onClick={() => onSortOrder('length')}
      >
        문장 갯수
      </Button>
      <Button
        size="sm"
        variant={orderBy === 'emotion' ? 'primary' : 'secondary'}
        onClick={() => onSortOrder('emotion')}
      >
        감정 농도
      </Button>
    </Container>
  )
}
