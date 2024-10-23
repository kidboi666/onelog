import { ReactNode, useTransition } from 'react'
import cn from '@/lib/cn'
import { useRouter } from 'next/navigation'
import Icon from '@/components/shared/Icon'
import BookMark from './BookMark'
import Button from '@/components/shared/Button'
import Spinner from '@/components/shared/Spinner'
import Text from '@/components/shared/Text'
import SelectedMenuBackground from './SelectedMenuBackground'
import { wait } from '@/utils/wait'

interface Props {
  isSelected: boolean
  icon: ReactNode
  name: string
  path: string
  close?: () => void
  viewText?: boolean
  className?: string
}

export default function MenuButton({
  isSelected,
  icon,
  viewText,
  name,
  close,
  path,
  className,
}: Props) {
  const router = useRouter()
  const [isLoading, startTransition] = useTransition()

  const handleButtonClick = async () => {
    router.push(path)
    await wait(100)
    close && close()
  }

  return (
    <div className={cn('relative flex justify-center', className)}>
      <BookMark isSelected={isSelected} />
      <Button
        variant="icon"
        onClick={() => startTransition(() => handleButtonClick())}
        className="relative size-full justify-start gap-4"
      >
        <SelectedMenuBackground isSelected={isSelected} />
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
