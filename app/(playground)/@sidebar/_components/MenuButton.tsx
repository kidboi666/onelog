import { ReactNode, useTransition } from 'react'
import cn from '@/lib/cn'
import Icon from '@/components/shared/Icon'
import BookMark from './BookMark'
import Button from '@/components/shared/Button'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/shared/Spinner'
import Text from '@/components/shared/Text'

interface Props {
  isSelected: boolean
  icon: ReactNode
  name: string
  path: string
  viewText?: boolean
  className?: string
}

export default function MenuButton({
  isSelected,
  icon,
  viewText,
  name,
  path,
  className,
}: Props) {
  const router = useRouter()
  const [isLoading, startTransition] = useTransition()

  const handleButtonClick = () => {
    router.push(path)
  }

  return (
    <div className={cn('relative flex justify-center', className)}>
      <BookMark isSelected={isSelected} />
      <Button
        variant="icon"
        onClick={() => startTransition(() => handleButtonClick())}
        className={cn(
          'relative size-full justify-start gap-4',
          isSelected &&
            'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300',
        )}
      >
        {isLoading ? (
          <div>
            <Spinner size={24} />
          </div>
        ) : (
          <Icon view="0 -960 960 960" size={24} className="flex flex-shrink-0">
            {icon}
          </Icon>
        )}
        {viewText && <Text type={isSelected ? 'body' : 'caption'}>{name}</Text>}
      </Button>
    </div>
  )
}
