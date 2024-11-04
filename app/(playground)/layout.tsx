import { Container } from '@/components/shared/Container'
import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  header: ReactNode
  sidebar: ReactNode
}

export default function Layout({
  header,
  sidebar,
  children,
}: PropsWithChildren<Props>) {
  return (
    <>
      {header}
      {sidebar}
      <Container className="my-8 flex flex-1 justify-center px-2 sm:ml-[80px] sm:px-4">
        <Container className="w-full lg:w-[768px]">{children}</Container>
      </Container>
    </>
  )
}
