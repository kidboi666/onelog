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
    <div className="my-4 flex animate-fade-in flex-col items-center gap-8">
      {profile}
      {user_info}
    </div>
  )
}
