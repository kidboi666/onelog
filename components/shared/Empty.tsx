import { PropsWithChildren } from 'react'
import Container from './Container'
import Text from './Text'
import cn from '@/lib/cn'

interface Props {
  className?: string
}

export default function Empty({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <Container isEmpty className={cn(className)}>
      <Text type="caption">{children}</Text>
    </Container>
  )
}
