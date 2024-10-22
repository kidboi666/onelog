import DeleteTodoModal from '@/app/(modals)/delete_todo/[todoId]/page'

interface Props {
  params: { todoId: string }
  searchParams: { folder_id: string }
}

export default function Page({ params, searchParams }: Props) {
  return <DeleteTodoModal params={params} searchParams={searchParams} />
}
