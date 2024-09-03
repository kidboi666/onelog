import { ReactNode, Suspense } from 'react'
import Spinner, { Size } from '@/components/shared/Spinner'

interface Props {
  profile: ReactNode
  user_info: ReactNode
}

export default function UserPage({ profile, user_info }: Props) {
  return (
    <Suspense fallback={<Spinner size={Size.l} />}>
      <div className="flex w-full animate-fade-in flex-col justify-center gap-8 bg-white lg:flex-row">
        <div className="h-fit w-full flex-shrink-0 lg:max-w-[300px] xl:sticky xl:top-[112px] xl:z-30">
          <div className="flex h-fit flex-col gap-8 bg-gray-50 px-4 py-8 xl:px-8">
            {profile}
          </div>
        </div>
        <div className="flex w-full flex-col px-4 lg:max-w-[768px]">
          <div className="flex w-full flex-col gap-12">{user_info}</div>
        </div>
      </div>
    </Suspense>
  )
}
