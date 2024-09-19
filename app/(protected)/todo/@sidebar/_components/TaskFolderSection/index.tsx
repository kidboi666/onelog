import Container from '@/components/shared/Container'
import Folder from './Folder'
import { TodoFolder } from '@/types/todo'

interface Props {
  isOpenSide: boolean
  todoFolders?: TodoFolder[]
}

export default function TaskFolderSection({ isOpenSide, todoFolders }: Props) {
  const sortedFolders = todoFolders?.sort((a, b) => a.index - b.index)
  return (
    <Container className="flex flex-col gap-2">
      {sortedFolders?.map((folder) => (
        <Folder key={folder.id} folder={folder} isOpenSide={isOpenSide} />
      ))}
    </Container>
  )
}
