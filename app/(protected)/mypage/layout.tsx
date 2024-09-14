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
    <Container className="flex w-full animate-fade-in flex-col justify-center md:flex-row xl:gap-8">
      <Box className="top-20 h-fit w-full max-xl:px-4 md:max-w-[300px] lg:sticky">
        {profile}
      </Box>
      <Box className="flex min-w-20 flex-col gap-12 py-12 max-xl:px-4 xl:max-w-[768px]">
        {user_info}
      </Box>
    </Container>
  )
}
