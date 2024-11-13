import Title from '@/components/shared/Title'
import { todoFolderQuery } from '@/services/queries/todo/todo-folder-query'
import { IUserSession, meQuery } from '@/services/queries/auth/me-query'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { createServerClient } from '@/lib/supabase/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import TodoFoldersSection from '../_components/TodoFoldersSection'

export default async function TodoDashBoard() {
  const supabase = createServerClient()
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(meQuery.getUserSession(supabase))
  const res = queryClient.getQueryData<IUserSession>(['me', 'session'])

  if (res) {
    queryClient.prefetchQuery(
      todoFolderQuery.getTodoFolder(supabase, res.userId),
    )
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="relative flex min-h-[calc(100dvh-80px)] w-full flex-col gap-4 overflow-y-auto p-4">
        <Title>할일 전체</Title>
        <TodoFoldersSection />
      </div>
    </HydrationBoundary>
  )
}
