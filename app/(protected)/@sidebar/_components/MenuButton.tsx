import { ReactNode } from 'react'
import cn from '@/lib/cn'
import Icon from '@/components/shared/Icon'
import { List } from '@/components/shared/List'
import Text from '@/components/shared/Text'
import LinkButton from '@/components/shared/LinkButton'
import useDataDrivenAnimation from '@/hooks/useStateChange'

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
  const { open, close, ref, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  if (isSelected) {
    open()
  } else {
    close()
  }
  return (
    <List.Row className={cn('relative', className)}>
      <div
        ref={ref}
        data-status="closed"
        onTransitionEnd={onTransitionEnd}
        className="absolute -left-2 top-1/2 h-full w-1 -translate-y-1/2 rounded-r-md bg-var-gray transition duration-500 data-[status=closed]:scale-0"
      />
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
        <div
          className={cn(
            'origin-left transition',
            isOpen ? '' : 'scale-x-0 opacity-0',
          )}
        >
          <Text type="caption" size="sm">
            {name}
          </Text>
        </div>
      </LinkButton>
    </List.Row>
  )
}
