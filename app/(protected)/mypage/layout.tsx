import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  profile: ReactNode
  user_info: ReactNode
}

export default async function UserLayout({
  profile,
  user_info,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex w-full animate-fade-in flex-col justify-center md:flex-row xl:gap-8">
      <div className="top-20 h-fit w-full max-xl:px-4 md:max-w-[300px] lg:sticky">
        {profile}
      </div>
      <div className="flex min-w-20 flex-col gap-12 py-12 max-xl:px-4 xl:max-w-[768px]">
        {user_info}
      </div>
    </div>
  )
}
