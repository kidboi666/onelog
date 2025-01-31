import { headers } from 'next/headers'
import { PropsWithChildren, ReactNode } from 'react'
import Portal from '@/src/components/Portal'
import { ZStack } from '@/src/components/Stack'

interface Props {
  sidebar: ReactNode
  main: ReactNode
  todo_info: ReactNode
}

export default async function Layout({
  sidebar,
  main,
  todo_info,
}: PropsWithChildren<Props>) {
  const headersList = headers()
  const pathname = headersList.get('x-pathname') || ''
  const isDetailOpen = pathname.startsWith('/todo/detail')

  return (
    <ZStack gap={8}>
      {main}
      {sidebar}
      {isDetailOpen && <Portal>{todo_info}</Portal>}
    </ZStack>
  )
}
