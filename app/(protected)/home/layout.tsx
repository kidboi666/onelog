import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-center">
      <div className="flex w-full flex-col gap-12 py-4 max-lg:px-4 lg:max-w-[768px]">
        {children}
      </div>
    </div>
  )
}
