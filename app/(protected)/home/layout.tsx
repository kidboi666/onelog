import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Container className="flex justify-center">
      <Box className="flex w-full flex-col gap-12 py-4 max-lg:px-4 lg:max-w-[768px]">
        {children}
      </Box>
    </Container>
  )
}
