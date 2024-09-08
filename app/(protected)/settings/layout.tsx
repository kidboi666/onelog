import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import Portal from '@/components/shared/Portal'
import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  modal: ReactNode
}

export default function SettingsLayout({
  children,
  modal,
}: PropsWithChildren<Props>) {
  return (
    <Container className="mt-20 flex w-full items-center justify-center">
      <Box className="flex w-full animate-fade-in flex-col gap-24 px-4 md:max-w-[560px]">
        {children}
      </Box>
      <Portal>{modal}</Portal>
    </Container>
  )
}
