import { PropsWithChildren, ReactNode } from 'react'
import Container from './_components/Container'

interface Props {
  profile: ReactNode
  user_info: ReactNode
}

export default async function UserLayout({
  profile,
  user_info,
}: PropsWithChildren<Props>) {
  return (
    <div className="mt-8 flex w-full animate-fade-in flex-col items-center gap-8">
      {profile}
      {user_info}
    </div>
  )
}
