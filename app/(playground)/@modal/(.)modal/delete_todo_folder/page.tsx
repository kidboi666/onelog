import DeleteTodoFolderModal from '@/app/(playground)/modal/delete_todo_folder/page'

interface Props {
  params: { folderId: string }
}

export default function Page({ params }: Props) {
  return <DeleteTodoFolderModal params={params} />
}
