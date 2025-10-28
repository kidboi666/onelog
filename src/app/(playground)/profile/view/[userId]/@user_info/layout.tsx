'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import { PropsWithChildren } from 'react'

interface Props {
  params: { userId: string }
}

export default function Layout({
  params: { userId },
  children,
}: PropsWithChildren<Props>) {
  const segment = useSelectedLayoutSegment()
  console.log(segment)
  return <>{children}</>
}
