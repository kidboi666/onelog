import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import { List } from '@/components/shared/List'
import Text from '@/components/shared/Text'
import cn from '@/lib/cn'
import { TODO_MENU } from '../../../_constants'
import { TodoMenu } from '@/store/useTodo'
import { useTransition } from 'react'
import Spinner from '@/components/shared/Spinner'
import { usePathname } from 'next/navigation'

interface Props {
  isOpenSide: boolean
  selectedMenu: TodoMenu | null
  onMenuSelect: (selectedMenu: TodoMenu) => any
  menu: (typeof TODO_MENU)[number]
}

export default function TodoMenuSection({
  isOpenSide,
  selectedMenu,
  onMenuSelect,
  menu,
}: Props) {
  const pathname = usePathname()
  const splitedPath = pathname.split('/')
  const isSelected = splitedPath.includes(menu.name)
  const [isLoading, startTransition] = useTransition()
  return (
    <List.Row key={menu.id} className="size-full animate-fade-in">
      <Button
        variant="list"
        onClick={() => startTransition(() => onMenuSelect(menu.name))}
        className="relative h-10 w-full gap-4 p-4"
      >
        <div
          className={cn(
            'relative flex size-2 items-center justify-center rounded-full text-zinc-400 transition',
            isSelected &&
              'bg-zinc-200 ring-8 ring-zinc-200 dark:bg-zinc-700 dark:ring-zinc-700',
          )}
        >
          <div className="absolute">
            {isLoading ? (
              <Spinner size={18} />
            ) : (
              <Icon view="0 -960 960 960" size={18}>
                {menu.icon}
              </Icon>
            )}
          </div>
        </div>
        {isOpenSide && (
          <Text
            type="caption"
            className={cn(
              'trasition',
              isSelected
                ? 'text-zinc-600 dark:text-zinc-200'
                : 'text-zinc-400 dark:text-zinc-500',
            )}
          >
            {menu.title}
          </Text>
        )}
      </Button>
    </List.Row>
  )
}
