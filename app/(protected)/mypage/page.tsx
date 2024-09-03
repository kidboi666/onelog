import FavoriteWords from './_components/FavoriteWords'
import History from './_components/History'
import PrevOneSentence from './_components/PrevOneSentence'
import ProfileSection from './_components/ProfileSection'
import Summary from './_components/Summary'
import { Suspense } from 'react'
import Spinner, { Size } from '@/components/shared/Spinner'

export default function UserPage() {
  return (
    <Suspense fallback={<Spinner size={Size.l} />}>
      <div className="flex w-full animate-fade-in flex-col justify-center gap-8 bg-white lg:flex-row">
        <div className="h-fit w-full flex-shrink-0 lg:max-w-[300px] xl:sticky xl:top-[112px] xl:z-30">
          <div className="flex h-fit flex-col gap-8 bg-gray-50 px-4 py-8 xl:px-8">
            <ProfileSection />
          </div>
        </div>
        <div className="flex w-full flex-col px-4 lg:max-w-[768px]">
          <div className="flex w-full flex-col gap-12">
            <Summary />
            <History />
            <FavoriteWords />
            <PrevOneSentence />
          </div>
        </div>
      </div>
    </Suspense>
  )
}
