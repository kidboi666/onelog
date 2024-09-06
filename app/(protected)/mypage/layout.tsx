import { PropsWithChildren, ReactNode } from 'react'
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
    <Container className="flex w-full animate-fade-in flex-col justify-center gap-8 bg-transparent lg:flex-row dark:bg-transparent">
      <Box className="h-fit w-full flex-shrink-0 bg-transparent lg:sticky lg:top-[63px] lg:z-30 lg:max-w-[300px] dark:bg-transparent">
        {profile}
      </Box>
      <Box className="flex w-full flex-col px-4 lg:max-w-[768px]">
        {user_info}
      </Box>
    </Container>
  )
}
