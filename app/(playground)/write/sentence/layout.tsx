import Container from '@/components/shared/Container'
import { PropsWithChildren } from 'react'

export default async function PostPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="z-30 my-4 flex w-full animate-fade-in justify-center">
      <Container className="h-fit gap-4">{children}</Container>
    </div>
  )
}
