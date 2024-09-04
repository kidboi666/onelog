import cn from '@/lib/cn'
import { INIT_STATUS } from '../_constants'
import Button, { ButtonProps } from '@/components/shared/Button'

interface Props extends ButtonProps {
  className: string
  state: typeof INIT_STATUS
  currentState: typeof INIT_STATUS
}

export default function EmotionBlock({
  className,
  currentState,
  onClick,
  state,
}: Props) {
  return (
    <Button
      variant="emptyStyle"
      onClick={onClick}
      className={cn(
        'flex size-10 items-center justify-center rounded-md border md:size-12',
        className,
      )}
    >
      {currentState.percent === state.percent && (
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}
    </Button>
  )
}
