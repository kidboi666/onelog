import Button from '@/components/shared/Button'

export default function SortOptionMenu() {
  return (
    <div className="flex gap-2 self-end">
      {/* <Button
        size="sm"
        variant={orderBy === 'length' ? 'primary' : 'secondary'}
        onClick={() => onSortOrder('length')}
      >
        문장 갯수
      </Button> */}
      <Button size="sm" variant="primary">
        감정 농도
      </Button>
    </div>
  )
}
