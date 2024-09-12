import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'

interface Props {
  onShowComment: () => void
}

export default function CommentButton({ onShowComment }: Props) {
  return (
    <Button
      variant="icon"
      size="icon"
      onClick={onShowComment}
      className="flex gap-2 border-none text-xs font-light"
    >
      <Icon size={16} view={150}>
        <g id="income">
          <path d="M33,105h21v15l18-15h45c4.97,0,9-4.03,9-9v-57c0-4.97-4.03-9-9-9H33c-4.97,0-9,4.03-9,9v57c0,4.97,4.03,9,9,9Z" />
          <line x1="51" y1="57" x2="99" y2="57" />
          <line x1="51" y1="78" x2="99" y2="78" />
        </g>
      </Icon>
      0
    </Button>
  )
}
