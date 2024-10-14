import Container from '@/components/shared/Container'
import { PropsWithChildren } from 'react'

export default async function PostPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="my-4 flex animate-fade-in flex-col items-center gap-8">
      <Container>{children}</Container>
    </div>
  )
}
