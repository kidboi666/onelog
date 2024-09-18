import DeleteTodoFolderModal from '../../(modals)/delete_todo_folder/[folderId]/page'

interface Props {
  params: { folderId: string }
}

export default function Page({ params }: Props) {
  return <DeleteTodoFolderModal params={params} />
}
