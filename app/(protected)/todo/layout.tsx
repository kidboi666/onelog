import Container from '@/components/shared/Container'
import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  sidebar: ReactNode
  main: ReactNode
  todo_info: ReactNode
}

export default function Layout({
  sidebar,
  main,
  todo_info,
}: PropsWithChildren<Props>) {
  return (
    <Container className="flex w-full animate-fade-in flex-row">
      {sidebar}
      {main}
      {todo_info}
    </Container>
  )
}
