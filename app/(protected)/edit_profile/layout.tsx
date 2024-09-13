import Container from '@/components/shared/Container'
import { PropsWithChildren, Suspense } from 'react'

export default function EditProfileLayout({ children }: PropsWithChildren) {
  return (
    <Container className="mt-20 flex w-full flex-col items-center px-4">
      {children}
    </Container>
  )
}
