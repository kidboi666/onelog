import { List } from '@/components/shared/List'
import Title from '@/components/shared/Title'
import { TodoFolder } from '@/types/todo'
import TodoFolderCard from './TodoFolderCard'

interface Props {
  todoFolders: TodoFolder[]
}

export default function TodoDashBoard({ todoFolders }: Props) {
  return (
    <>
      <Title>할일 대시보드</Title>
      <List className="flex flex-wrap gap-4">
        {todoFolders.map((folder) => (
          <TodoFolderCard key={folder.id} folder={folder} />
        ))}
      </List>
    </>
  )
}
