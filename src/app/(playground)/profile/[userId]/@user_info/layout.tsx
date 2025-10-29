'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import { PropsWithChildren } from 'react'

interface Props {
  params: Promise<{ userId: string }>
}

export default function Layout({
  children,
}: PropsWithChildren<Props>) {
  const segment = useSelectedLayoutSegment()
  console.log(segment)
  return <>{children}</>
}
