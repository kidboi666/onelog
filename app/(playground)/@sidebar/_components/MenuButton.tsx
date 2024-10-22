import { ReactNode, useTransition } from 'react'
import cn from '@/lib/cn'
import Icon from '@/components/shared/Icon'
import { List } from '@/components/shared/List'
import Text from '@/components/shared/Text'
import LinkButton from '@/components/shared/LinkButton'
import BookMark from './BookMark'
import Button from '@/components/shared/Button'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/shared/Spinner'

interface Props {
  isOpen: boolean
  isSelected: boolean
  icon: ReactNode
  name: string
  path: string
  className?: string
  close: () => void
}

export default function MenuButton({
  isOpen,
  isSelected,
  icon,
  name,
  path,
  className,
  close,
}: Props) {
  const router = useRouter()
  const [isLoading, startTransition] = useTransition()

  const handleButtonClick = () => {
    close()
    router.push(path)
  }

  return (
    <List.Row className={cn('relative', className)}>
      <BookMark isSelected={isSelected} />
      <Button
        variant="icon"
        onClick={() => startTransition(() => handleButtonClick())}
        className={cn(
          'relative justify-start gap-4',
          isSelected ? 'text-zinc-500 dark:text-zinc-300' : '',
        )}
      >
        {isLoading ? (
          <Spinner size={16} />
        ) : (
          <Icon view="0 -960 960 960" size={16} className="flex flex-shrink-0">
            {icon}
          </Icon>
        )}
        {isOpen && (
          <div className="animate-fade-in">
            <Text type="caption" size="sm">
              {name}
            </Text>
          </div>
        )}
      </Button>
    </List.Row>
  )
}
