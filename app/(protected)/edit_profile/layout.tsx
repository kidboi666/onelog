import Container from '@/components/shared/Container'
import { PropsWithChildren } from 'react'

export default function EditProfileLayout({ children }: PropsWithChildren) {
  return (
    <Container className="mt-20 flex w-full justify-center px-4">
      {children}
    </Container>
  )
}
