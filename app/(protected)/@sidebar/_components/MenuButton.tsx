import { ReactNode } from 'react'
import cn from '@/lib/cn'
import Icon from '@/components/shared/Icon'
import { List } from '@/components/shared/List'
import Text from '@/components/shared/Text'
import LinkButton from '@/components/shared/LinkButton'

interface Props {
  isOpen: boolean
  icon: ReactNode
  name: string
  path: string
}

export default function MenuButton({ isOpen, icon, name, path }: Props) {
  return (
    <List.Row>
      <LinkButton
        href={path}
        variant="icon"
        innerClassName="justify-start gap-4"
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
