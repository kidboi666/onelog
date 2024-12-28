'use client'

import { List } from '@/src/components/List'
import TodoFolderCard from '../../_components/TodoFolderCard'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { todoFolderQuery } from '@/src/services/queries/todo/todo-folder-query'
import useMeQueries from '@/src/hooks/queries/useMeQueries'

export default function TodoFoldersSection() {
  const { me } = useMeQueries()
  const { data: todoFolders } = useSuspenseQuery(
    todoFolderQuery.getTodoFolder(supabase, me?.id),
  )
  return (
    <List className="flex flex-wrap gap-4">
      {todoFolders?.map((folder) => (
        <TodoFolderCard key={folder.id} folder={folder} userId={me?.id} />
      ))}
    </List>
  )
}
