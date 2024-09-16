import Container from '@/components/shared/Container'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return <Container>{children}</Container>
}
