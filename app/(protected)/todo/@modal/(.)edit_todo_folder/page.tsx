import EditTodoFolderModal from '../../(modals)/edit_todo_folder/[folderId]/page'

interface Props {
  params: { folderId: string }
}

export default function Page({ params }: Props) {
  return <EditTodoFolderModal params={params} />
}
