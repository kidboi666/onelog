'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import HeaderNavSection from './HeaderNavSection'
import Container from '@/components/shared/Container'
import Box from '@/components/shared/Box'

export default function Header() {
  const router = useRouter()
  return (
    <Container
      as="header"
      className="dark:bg-var-dark sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b p-4 backdrop-blur-md md:h-28 md:items-start md:px-12 dark:border-white/20"
    >
      <Box
        onClick={() => router.push('/mypage')}
        className="relative h-full w-24 cursor-pointer md:w-40"
      >
        <Image src="/logo_horizontal.svg" fill alt="하루한줄 로고" />
      </Box>
      <HeaderNavSection />
    </Container>
  )
}
