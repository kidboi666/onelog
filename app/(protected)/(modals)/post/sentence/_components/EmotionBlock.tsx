import cn from '@/lib/cn'
import Button, { ButtonProps } from '@/components/shared/Button'

interface Props extends ButtonProps {
  className: string
}

export default function EmotionBlock({ className, onClick }: Props) {
  return (
    <Button
      variant="emptyStyle"
      onClick={onClick}
      className={cn(
        'flex size-full items-center justify-center p-0',
        className,
      )}
    ></Button>
  )
}
