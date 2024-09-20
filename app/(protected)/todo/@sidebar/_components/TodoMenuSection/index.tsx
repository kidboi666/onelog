import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import { List } from '@/components/shared/List'
import Text from '@/components/shared/Text'
import cn from '@/lib/cn'
import { TODO_MENU } from '../../../_constants'
import { TodoMenu } from '@/store/useTodo'

interface Props {
  isOpenSide: boolean
  selectedMenu: TodoMenu | null
  onMenuSelect: (selectedMenu: TodoMenu) => any
}

export default function TodoMenuSection({
  isOpenSide,
  selectedMenu,
  onMenuSelect,
}: Props) {
  return (
    <List className="flex flex-col gap-2">
      {TODO_MENU.map((menu) => (
        <List.Row key={menu.id} className="size-full animate-fade-in">
          <Button
            variant="list"
            onClick={() => onMenuSelect(menu.name)}
            className="relative h-10 w-full gap-4 p-4"
          >
            <div
              className={cn(
                'relative flex size-2 items-center justify-center rounded-full text-zinc-400 transition',
                selectedMenu === menu.name &&
                  'bg-zinc-200 ring-8 ring-zinc-200 dark:bg-zinc-700 dark:ring-zinc-700',
              )}
            >
              <div className="absolute">
                <Icon view="0 -960 960 960" size={18}>
                  {menu.icon}
                </Icon>
              </div>
            </div>
            {isOpenSide && (
              <Text
                type="caption"
                className={cn(
                  'trasition',
                  selectedMenu === menu.name
                    ? 'text-zinc-600 dark:text-zinc-200'
                    : 'text-zinc-400 dark:text-zinc-500',
                )}
              >
                {menu.title}
              </Text>
            )}
          </Button>
        </List.Row>
      ))}
    </List>
  )
}
