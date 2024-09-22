import { useRouter } from 'next/navigation'
import { MutableRefObject, useState, useTransition } from 'react'
import cn from '@/lib/cn'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { Tables } from '@/types/supabase'
import { todoFolderQuery } from '@/services/queries/todo/todoFolderQuery'
import { meQuery } from '@/services/queries/auth/meQuery'
import useUpdateTodoFolder from '@/services/mutates/todo/useUpdateTodoFolder'
import useOutsideClick from '@/hooks/useOutsideClick'
import useStateChange from '@/hooks/useStateChange'

import Text from '@/components/shared/Text'
import Button from '@/components/shared/Button'
import FolderDropDown from './FolderDropDown'
import Icon from '@/components/shared/Icon'
import { List } from '@/components/shared/List'
import Dot from './Dot'
import Spinner from '@/components/shared/Spinner'

interface Props {
  isOpenSide: boolean
  isSelected: boolean
  folder: Tables<'todo_folder'>
  dragItem: MutableRefObject<Tables<'todo_folder'> | null>
  dragOverItem: MutableRefObject<Tables<'todo_folder'> | null>
}

export default function Folder({
  isOpenSide,
  isSelected = false,
  folder,
  dragItem,
  dragOverItem,
}: Props) {
  const router = useRouter()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: todoFolders } = useSuspenseQuery(
    todoFolderQuery.getTodoFolder(supabase, me.userId),
  )
  const { mutate: updateTodoFolder } = useUpdateTodoFolder()
  const {
    ref: dropdownRef,
    close,
    onClick,
    onTransitionEnd,
  } = useStateChange<HTMLDivElement>()
  const dropdownButtonRef = useOutsideClick<HTMLButtonElement>(close)
  const [showKebabButton, setShowKebabButton] = useState(false)
  const [isHover, setHover] = useState(false)
  const [isDraggingDown, setDraggingDown] = useState(false)
  const [isLoading, startTransition] = useTransition()

  const handleFolderClick = () => {
    router.push(`/todo/custom_task/${folder.id}?color=${folder.color}`)
  }

  const dragStart = () => {
    dragItem.current = folder
  }

  const dragEnter = (targetFolder: Tables<'todo_folder'>) => {
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

  const drop = async () => {
    setHover(false)
    setDraggingDown(false)
    const isEqual = dragItem.current!.index === dragOverItem.current!.index
    if (isEqual) return null

    let targetItemList
    let sortedList
    let updatedIndexFolder

    if (dragItem.current!.index < dragOverItem.current!.index) {
      targetItemList = todoFolders.filter(
        (folder) =>
          folder.index !== dragItem.current!.index &&
          folder.index <= dragOverItem.current!.index,
      )
      sortedList = targetItemList.map((item) => ({
        ...item,
        index: item.index - 1,
      }))
      updatedIndexFolder = {
        ...dragItem.current!,
        index: dragOverItem.current!.index,
      }
    } else {
      targetItemList = todoFolders.filter(
        (folder) =>
          folder.index !== dragItem.current!.index &&
          folder.index >= dragOverItem.current!.index,
      )
      sortedList = targetItemList.map((item) => ({
        ...item,
        index: item.index + 1,
      }))
      updatedIndexFolder = {
        ...dragItem.current!,
        index: dragOverItem.current!.index,
      }
    }

    sortedList.forEach((item) => {
      updateTodoFolder({
        name: item.name,
        color: item.color,
        index: item.index,
        id: item.id,
      })
    })
    updateTodoFolder({
      name: updatedIndexFolder.name,
      color: updatedIndexFolder.color,
      index: updatedIndexFolder.index,
      id: updatedIndexFolder.id,
    })
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
          onClick={() => startTransition(() => handleFolderClick())}
          ref={dropdownButtonRef}
          className={cn(
            'flex h-10 w-full p-4',
            isOpenSide ? 'gap-4' : 'justify-center',
          )}
          onMouseEnter={() => setShowKebabButton(true)}
          onMouseLeave={() => setShowKebabButton(false)}
        >
          {isLoading ? (
            <div className="absolute">
              <Spinner size={18} />
            </div>
          ) : (
            <Dot color={folder.color} isSelected={isSelected} />
          )}
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
