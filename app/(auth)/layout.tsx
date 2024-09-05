import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import Image from 'next/image'
import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <Container className="flex h-screen flex-col items-center justify-center">
      <Box className="relative h-40 w-full">
        <Image src="logo_horizontal.svg" fill alt="로고 이미지" />
      </Box>
      <Box className="flex w-full flex-col items-center justify-center gap-12 p-4 md:p-8">
        {children}
      </Box>
    </Container>
  )
}
