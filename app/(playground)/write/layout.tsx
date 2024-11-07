import { ZStack } from '@/components/shared/Stack'
import { ReactNode } from 'react'

interface Props {
  side_options: ReactNode
  write_section: ReactNode
}

export default function Layout({ side_options, write_section }: Props) {
  return (
    <ZStack gap={8}>
      {side_options}
      {write_section}
    </ZStack>
  )
}
