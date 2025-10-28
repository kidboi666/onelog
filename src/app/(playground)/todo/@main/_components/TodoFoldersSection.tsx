'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useMe } from '@/src/store/hooks/useMe'
import { todoQuery } from '@/src/services/queries/todo/todo-query'
import { List } from '@/src/components/List'

export default function TodoFoldersSection() {
  const { me } = useMe()
  const { data: todoFolders } = useSuspenseQuery(
    todoQuery.getTodoFolder(me!.id),
  )
  return (
    <List className="flex flex-wrap gap-4">
      {/*{todoFolders?.map((folder) => (*/}
      {/*  <TodoFolderCard key={folder.id} folder={folder} userId={me?.id} />*/}
      {/*))}*/}
    </List>
  )
}
