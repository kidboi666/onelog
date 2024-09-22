'use client'

import { List } from '@/components/shared/List'
import { useMemo, useRef } from 'react'
import Folder from '../../../_components/Folder'
import { Tables } from '@/types/supabase'
import { useParams } from 'next/navigation'

interface Props {
  isOpenSide: boolean
  todoFolders?: Tables<'todo_folder'>[]
}

export default function TaskFolderSection({ isOpenSide, todoFolders }: Props) {
  const { folderId } = useParams()
  const dragItem = useRef<Tables<'todo_folder'> | null>(null)
  const dragOverItem = useRef<Tables<'todo_folder'> | null>(null)
  const sortedFolders = useMemo(
    () => todoFolders?.sort((a, b) => a.index - b.index),
    [todoFolders],
  )
  return (
    <List className="flex flex-col gap-2">
      {sortedFolders?.map((folder) => (
        <Folder
          key={folder.id}
          folder={folder}
          isSelected={Number(folderId) === folder.id}
          isOpenSide={isOpenSide}
          dragItem={dragItem}
          dragOverItem={dragOverItem}
        />
      ))}
    </List>
  )
}
