import { PropsWithChildren, ReactNode, Suspense } from 'react'
import Spinner, { Size } from '@/components/shared/Spinner'
import Container from '@/components/shared/Container'
import Box from '@/components/shared/Box'

interface Props {
  profile: ReactNode
  user_info: ReactNode
}

export default function UserLayout({
  profile,
  user_info,
}: PropsWithChildren<Props>) {
  return (
    <Suspense fallback={<Spinner size={Size.l} />}>
      <Container className="flex w-full animate-fade-in flex-col justify-center gap-8 bg-transparent lg:flex-row dark:bg-transparent">
        <Box className="h-fit w-full flex-shrink-0 bg-transparent lg:sticky lg:top-[63px] lg:z-30 lg:max-w-[300px] dark:bg-transparent">
          <Container className="mt-12 flex h-fit flex-col gap-8 rounded-md border bg-transparent px-4 py-8 xl:px-8 dark:border-gray-600 dark:bg-transparent">
            {profile}
          </Container>
        </Box>
        <Box className="flex w-full flex-col px-4 lg:max-w-[768px]">
          <Container className="flex w-full flex-col gap-12">
            {user_info}
          </Container>
        </Box>
      </Container>
    </Suspense>
  )
}
