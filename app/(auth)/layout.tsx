import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import { PropsWithChildren } from 'react'
import AuthLogoSection from './_components/AuthLogoSection'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <Container className="flex h-screen flex-col items-center justify-center">
      <AuthLogoSection />
      <Box className="flex w-full flex-col items-center justify-center gap-12 p-4 md:p-8">
        {children}
      </Box>
    </Container>
  )
}
