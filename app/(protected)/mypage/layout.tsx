import { PropsWithChildren } from 'react'
import ProfileSection from './_components/ProfileSection'

export default function UserPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full flex-col justify-center gap-8 bg-white xl:flex-row">
      <div className="flex h-fit w-full flex-col bg-gray-50 p-4 xl:max-w-[300px]">
        <ProfileSection />
      </div>
      <div className="flex w-full flex-col px-4 xl:max-w-[768px]">
        <div className="flex flex-col gap-12">{children}</div>
      </div>
    </div>
  )
}
