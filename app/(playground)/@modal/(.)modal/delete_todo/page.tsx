import DeleteTodoModal from '@/app/(playground)/modal/delete_todo/page'

interface Props {
  params: { todoId: string }
}

export default function Page({ params }: Props) {
  return <DeleteTodoModal params={params} />
}
