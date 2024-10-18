import { ReactNode } from 'react'
import cn from '@/lib/cn'
import Icon from '@/components/shared/Icon'
import { List } from '@/components/shared/List'
import Text from '@/components/shared/Text'
import LinkButton from '@/components/shared/LinkButton'
import useDataDrivenAnimation from '@/hooks/useStateChange'
import BookMark from './BookMark'

interface Props {
  isOpen: boolean
  isSelected: boolean
  icon: ReactNode
  name: string
  path: string
  className?: string
}

export default function MenuButton({
  isOpen,
  isSelected,
  icon,
  name,
  path,
  className,
}: Props) {
  return (
    <List.Row className={cn('relative', className)}>
      <BookMark isSelected={isSelected} />
      <LinkButton
        href={path}
        variant="icon"
        innerClassName={cn(
          'justify-start gap-4 relative',
          isSelected ? 'text-zinc-500 dark:text-zinc-300' : '',
        )}
      >
        <Icon view="0 -960 960 960" size={16} className="flex flex-shrink-0">
          {icon}
        </Icon>
        {isOpen && (
          <div className="animate-fade-in">
            <Text type="caption" size="sm">
              {name}
            </Text>
          </div>
        )}
      </LinkButton>
    </List.Row>
  )
}
