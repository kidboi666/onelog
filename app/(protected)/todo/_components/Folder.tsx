import { MutableRefObject, useState } from 'react'
import cn from '@/lib/cn'
import { useTodo } from '@/store/useTodo'
import useOutsideClick from '@/hooks/useOutsideClick'
import useStateChange from '@/hooks/useStateChange'

import Text from '@/components/shared/Text'
import Button from '@/components/shared/Button'
import FolderDropDown from './FolderDropDown'
import Dot from './Dot'
import Icon from '@/components/shared/Icon'
import { TodoFolder } from '@/types/todo'
import { List } from '@/components/shared/List'
import { useRouter } from 'next/navigation'

interface Props {
  isOpenSide: boolean
  folder: TodoFolder
  dragItem: MutableRefObject<TodoFolder | null>
  dragOverItem: MutableRefObject<TodoFolder | null>
}

export default function Folder({
  isOpenSide,
  folder,
  dragItem,
  dragOverItem,
}: Props) {
  const router = useRouter()
  const { selectedFolder, setSelectedFolder, todoFolders, setTodoFolders } =
    useTodo()
  const {
    ref: dropdownRef,
    close,
    onClick,
    onTransitionEnd,
  } = useStateChange<HTMLDivElement>()
  const dropdownButtonRef = useOutsideClick<HTMLButtonElement>(close)
  const isSelected = folder.id === selectedFolder?.id
  const [showKebabButton, setShowKebabButton] = useState(false)
  const [isHover, setHover] = useState(false)
  const [isDraggingDown, setDraggingDown] = useState(false)

  const handleFolderClick = () => {
    setSelectedFolder(folder)
    router.push('/todo/custom_task')
  }

  const dragStart = () => {
    dragItem.current = folder
  }

  const dragEnter = (targetFolder: TodoFolder) => {
    dragOverItem.current = targetFolder
    setDraggingDown(dragItem.current!.index < dragOverItem.current!.index)
    setHover(true)
  }

  const dragOver = () => {
    setHover(folder.index === dragOverItem.current!.index)
  }

  const dragLeave = () => {
    setHover(false)
  }

  const drop = () => {
    setHover(false)
    setDraggingDown(false)
    const isEqual = dragItem.current!.index === dragOverItem.current!.index
    if (isEqual) return null

    if (dragItem.current!.index < dragOverItem.current!.index) {
      const targetItemList = todoFolders.filter(
        (folder) =>
          folder.index !== dragItem.current!.index &&
          folder.index <= dragOverItem.current!.index,
      )
      const restItemList = todoFolders.filter(
        (folder) => folder.index > dragOverItem.current!.index,
      )
      const sortedList = targetItemList.map((item) => ({
        ...item,
        index: item.index - 1,
      }))
      const updatedIndexFolder = {
        ...dragItem.current!,
        index: dragOverItem.current!.index,
      }
      const nextFolders = [...sortedList, updatedIndexFolder, ...restItemList]
      setTodoFolders(nextFolders)
    } else {
      const targetItemList = todoFolders.filter(
        (folder) =>
          folder.index !== dragItem.current!.index &&
          folder.index >= dragOverItem.current!.index,
      )
      const restItemList = todoFolders.filter(
        (folder) => folder.index < dragOverItem.current!.index,
      )
      const sortedList = targetItemList.map((item) => ({
        ...item,
        index: item.index + 1,
      }))
      const updatedIndexFolder = {
        ...dragItem.current!,
        index: dragOverItem.current!.index,
      }
      const nextFolders = [...restItemList, updatedIndexFolder, ...sortedList]
      setTodoFolders(nextFolders)
    }
    dragOverItem.current = null
  }

  return (
    <>
      <List.Row
        draggable
        onDragStart={dragStart}
        onDragEnter={() => dragEnter(folder)}
        onDragLeave={dragLeave}
        onDragEnd={drop}
        onDragOver={dragOver}
        className={cn(
          'relative size-full animate-fade-in border border-transparent transition',
          isHover && isDraggingDown === false && 'border-t-blue-500',
          isHover && isDraggingDown && 'border-b-blue-500',
        )}
      >
        <Button
          variant="list"
          onClick={handleFolderClick}
          ref={dropdownButtonRef}
          className={cn(
            'flex h-10 w-full p-4',
            isOpenSide ? 'gap-4' : 'justify-center',
          )}
          onMouseEnter={() => setShowKebabButton(true)}
          onMouseLeave={() => setShowKebabButton(false)}
        >
          <Dot color={folder.dotColor} isSelected={isSelected} />
          {isOpenSide && (
            <div className="flex flex-1 items-center justify-between">
              <Text
                type="caption"
                className={cn(
                  'transition',
                  isSelected ? 'text-zinc-600 dark:text-zinc-200' : '',
                )}
              >
                {folder?.name}
              </Text>
              {showKebabButton && (
                <Button
                  variant="icon"
                  size="none"
                  onClick={onClick}
                  className="ring-0 hover:bg-zinc-300 dark:hover:bg-zinc-600"
                >
                  <Icon view="0 -960 960 960" size={20}>
                    <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
                  </Icon>
                </Button>
              )}
            </div>
          )}
        </Button>
        <FolderDropDown
          targetRef={dropdownRef}
          onTransitionEnd={onTransitionEnd}
          folderId={folder.id}
        />
      </List.Row>
    </>
  )
}
