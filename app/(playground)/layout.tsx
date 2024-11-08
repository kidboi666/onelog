'use client'

import { Container } from '@/components/shared/Container'
import Portal from '@/components/shared/Portal'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  header: ReactNode
  sidebar: ReactNode
  modal: ReactNode
}

export default function Layout({
  header,
  sidebar,
  children,
  modal,
}: PropsWithChildren<Props>) {
  const pathname = usePathname()
  const isModalOpen = pathname.startsWith('/modal')
  return (
    <>
      {header}
      {sidebar}
      {isModalOpen && <Portal>{modal}</Portal>}
      <Container className="my-8 flex flex-1 justify-center px-2 sm:ml-[80px] sm:px-4">
        <Container className="w-full lg:w-[880px]">{children}</Container>
      </Container>
    </>
  )
}
