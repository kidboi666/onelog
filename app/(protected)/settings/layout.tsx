import Portal from '@/components/portal/Portal'
import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  modal: ReactNode
}

export default function SettingsLayout({
  children,
  modal,
}: PropsWithChildren<Props>) {
  return (
    <div className="mt-20 flex w-full flex-col gap-12 px-2 md:max-w-[560px]">
      {children}
      <Portal>{modal}</Portal>
    </div>
  )
}
