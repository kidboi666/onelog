import { ReactNode } from 'react'

import { ZStack } from '@/src/components/Stack'

interface Props {
  post: ReactNode
  side_menu: ReactNode
}

export default function Layout({ post, side_menu }: Props) {
  return (
    <ZStack gap={8}>
      {post}
      {side_menu}
    </ZStack>
  )
}
