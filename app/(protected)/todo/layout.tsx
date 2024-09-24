'use client'

import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  sidebar: ReactNode
  main: ReactNode
  todo_info: ReactNode
}

export default function Layout({
  sidebar,
  main,
  todo_info,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex w-full animate-fade-in flex-row overflow-hidden">
      {sidebar}
      {main}
      {todo_info}
    </div>
  )
}
