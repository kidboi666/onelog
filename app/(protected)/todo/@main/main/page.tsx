import Title from '@/components/shared/Title'
import { todoFolderQuery } from '@/services/queries/todo/todoFolderQuery'
import { meQuery } from '@/services/queries/auth/meQuery'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { ISessionInfo } from '@/types/auth'
import { createServerClient } from '@/lib/supabase/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import TodoFoldersSection from '../_components/TodoFoldersSection'

export default async function TodoDashBoard() {
  const supabase = createServerClient()
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(meQuery.getUserSession(supabase))
  const res = queryClient.getQueryData<ISessionInfo>(['me', 'session'])

  if (res) {
    queryClient.prefetchQuery(
      todoFolderQuery.getTodoFolder(supabase, res.userId),
    )
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Title>할일 전체</Title>
      <TodoFoldersSection />
    </HydrationBoundary>
  )
}
