import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  sidebar: ReactNode
  main: ReactNode
}

export default function Layout({ sidebar, main }: PropsWithChildren<Props>) {
  return (
    <div className="flex w-full animate-fade-in flex-row">
      {sidebar}
      {main}
    </div>
  )
}
