'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { meQuery } from '@/src/services/queries/auth/me-query'
import { todoFolderQuery } from '@/src/services/queries/todo/todo-folder-query'
import { List } from '@/src/components/List'
import TodoFolderCard from '../../_components/TodoFolderCard'

export default function TodoFoldersSection() {
  const { data: session } = useSuspenseQuery(meQuery.getSession(supabase))
  const { data: todoFolders } = useSuspenseQuery(
    todoFolderQuery.getTodoFolder(supabase, session?.userId),
  )
  return (
    <List className="flex flex-wrap gap-4">
      {todoFolders?.map((folder) => (
        <TodoFolderCard
          key={folder.id}
          folder={folder}
          userId={session?.userId}
        />
      ))}
    </List>
  )
}
