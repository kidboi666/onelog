import { PropsWithChildren, ReactNode } from 'react'
import Container from '@/components/shared/Container'
import Box from '@/components/shared/Box'

interface Props {
  profile: ReactNode
  user_info: ReactNode
}

export default async function UserLayout({
  profile,
  user_info,
}: PropsWithChildren<Props>) {
  return (
    <Container className="flex w-full animate-fade-in flex-col justify-center gap-8 lg:flex-row">
      <Box className="h-fit w-full flex-1 lg:sticky lg:top-20 lg:max-w-[300px]">
        {profile}
      </Box>
      <Box className="flex w-full flex-col gap-12 py-12 max-lg:px-4 lg:max-w-[768px]">
        {user_info}
      </Box>
    </Container>
  )
}
