import Portal from '@/components/shared/Portal'
import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  modal: ReactNode
}

export default function SettingsLayout({
  children,
  modal,
}: PropsWithChildren<Props>) {
  return (
    <div className="my-4 flex w-full items-center justify-center">
      <div className="flex w-full animate-fade-in flex-col gap-24 px-4 md:max-w-[560px]">
        {children}
      </div>
      <Portal>{modal}</Portal>
    </div>
  )
}
