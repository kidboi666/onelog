import Container from '@/components/shared/Container'
import Folder from './Folder'
import { INIT_TODO_FOLDER } from '../../default'

interface Props {
  isOpenSide: boolean
  todoFolders?: (typeof INIT_TODO_FOLDER)[]
}

export default function TaskFolderSection({ isOpenSide, todoFolders }: Props) {
  return (
    <Container className="flex flex-col gap-2">
      {todoFolders?.map((folder) => (
        <Folder key={folder.id} folder={folder} isOpenSide={isOpenSide} />
      ))}
    </Container>
  )
}
