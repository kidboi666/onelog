'use client'

import { List } from '@/components/shared/List'
import Title from '@/components/shared/Title'
import { useSuspenseQuery } from '@tanstack/react-query'
import { todoFolderQuery } from '@/services/queries/todo/todoFolderQuery'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import TodoFolderCard from '../../_components/TodoFolderCard'

export default function TodoDashBoard() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: todoFolders } = useSuspenseQuery(
    todoFolderQuery.getTodoFolder(supabase, me.userId),
  )

  return (
    <>
      <Title>할일 전체</Title>
      <List className="flex flex-wrap gap-4">
        {todoFolders.map((folder) => (
          <TodoFolderCard key={folder.id} folder={folder} userId={me.userId} />
        ))}
      </List>
    </>
  )
}
