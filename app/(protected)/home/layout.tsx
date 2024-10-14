import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-center">
      <div className="my-2 flex w-full flex-col gap-12 max-lg:px-4 lg:max-w-[768px]">
        {children}
      </div>
    </div>
  )
}
