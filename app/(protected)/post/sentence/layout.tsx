import Container from '@/components/shared/Container'
import { PropsWithChildren } from 'react'

export default async function PostPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="absolute right-0 top-[56px] z-30 mx-auto my-4 h-[calc(100dvh-88px)] w-full animate-fade-in gap-8 sm:w-[calc(100%-72px)] lg:left-1/2 lg:max-w-[768px] lg:-translate-x-1/2">
      <Container className="h-full">{children}</Container>
    </div>
  )
}
