import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex animate-fade-in justify-center">
      <div className="my-4 flex w-full flex-col gap-4 max-lg:px-4 lg:max-w-[768px]">
        {children}
      </div>
    </div>
  )
}
