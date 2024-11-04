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
      <Container className="my-8 flex flex-1 justify-center max-lg:px-4 sm:ml-[80px]">
        <Container className="w-full lg:w-[768px]">{children}</Container>
      </Container>
    </>
  )
}
