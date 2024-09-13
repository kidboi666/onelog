import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  sidebar: ReactNode
  task_manager: ReactNode
}

export default function Layout({
  sidebar,
  task_manager,
}: PropsWithChildren<Props>) {
  return (
    <Container className="flex w-full animate-fade-in flex-col justify-center gap-8 lg:flex-row">
      <Box className="h-fit w-full flex-shrink-0 lg:sticky lg:top-[112px] lg:max-w-[300px]">
        {sidebar}
      </Box>
      <Box className="flex w-full flex-col px-4 py-12 lg:max-w-[768px]">
        {task_manager}
      </Box>
    </Container>
  )
}
