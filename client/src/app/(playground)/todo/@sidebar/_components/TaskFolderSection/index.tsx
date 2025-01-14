'use client'

import { useParams } from 'next/navigation'
import { useRef } from 'react'
import { Tables } from '@/src/types/supabase'
import { List } from '@/src/components/List'
import Folder from '../../../_components/Folder'

interface Props {
  todoFolders?: Tables<'todo_folder'>[]
}

export default function TaskFolderSection({ todoFolders }: Props) {
  const { folderId } = useParams()
  const dragItem = useRef<Tables<'todo_folder'> | null>(null)
  const dragOverItem = useRef<Tables<'todo_folder'> | null>(null)
  const sortedFolders = todoFolders?.sort((a, b) => a.index - b.index)

  return (
    <List className="flex flex-col gap-2">
      {sortedFolders?.map((folder) => (
        <Folder
          key={folder.id}
          folder={folder}
          isSelected={Number(folderId) === folder.id}
          dragItem={dragItem}
          dragOverItem={dragOverItem}
        />
      ))}
    </List>
  )
}
