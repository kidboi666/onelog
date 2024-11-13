import Portal from '@/components/shared/Portal'
import { ZStack } from '@/components/shared/Stack'
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
    <ZStack gap={8}>
      {main}
      {sidebar}
      <Portal>{todo_info}</Portal>
    </ZStack>
  )
}
