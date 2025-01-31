import Title from '@/src/components/Title'
import TodoFoldersSection from '../_components/TodoFoldersSection'

export default async function TodoDashBoard() {
  return (
    <div className="relative flex min-h-[calc(100dvh-80px)] w-full flex-col gap-4 overflow-y-auto p-4">
      <Title>할일 전체</Title>
      <TodoFoldersSection />
    </div>
  )
}
