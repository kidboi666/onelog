import { HydrationBoundary } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { postPrefetchQuery } from '@/src/services/queries/post/post-prefetch-query'
import { Container } from '@/src/components/Container'
import { ZStack } from '@/src/components/Stack'
import MenuSection from './journal_garden/_components/MenuSection'

interface Props {
  params: { userId: string }
}

export default async function Layout({ params, children }: PropsWithChildren<Props>) {
  const userId = params.userId

  const state = await Promise.all([
    await postPrefetchQuery.countAllPost(userId, 'journal'),
    await postPrefetchQuery.countAllPost(userId, 'article'),
    await postPrefetchQuery.countLikedPost(userId),
  ])

  return (
    <HydrationBoundary state={state}>
      <Container className="overflow-x-auto rounded-md bg-white p-1 shadow-sm dark:bg-var-darkgray">
        <ZStack gap={2}>
          <MenuSection userId={userId} />
        </ZStack>
      </Container>
      {children}
    </HydrationBoundary>
  )
}
