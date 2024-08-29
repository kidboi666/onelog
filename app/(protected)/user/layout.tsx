import { PropsWithChildren } from 'react'
import LeftSection from './_components/LeftSection'
import Summary from './_components/Summary'

export default function UserPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full justify-center bg-white">
      <div className="h-screen max-w-[400px] bg-gray-100 p-12">
        <LeftSection />
      </div>
      <div className="flex w-full max-w-[896px] flex-col px-12">
        <Summary />
        <div className="flex flex-col gap-12">{children}</div>
      </div>
    </div>
  )
}
