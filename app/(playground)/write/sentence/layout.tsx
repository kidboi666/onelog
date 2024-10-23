import Container from '@/components/shared/Container'
import { PropsWithChildren } from 'react'

export default async function PostPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="z-30 my-4 flex h-[calc(100dvh-102px)] w-full animate-fade-in justify-center gap-8 sm:h-[calc(100dvh-32px)]">
      <Container className="h-full">{children}</Container>
    </div>
  )
}
