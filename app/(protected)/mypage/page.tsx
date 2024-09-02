import Line from '@/components/shared/Line'
import FavoriteWords from './_components/FavoriteWords'
import History from './_components/History'
import PrevOneSentence from './_components/PrevOneSentence'
import ProfileSection from './_components/ProfileSection'
import Summary from './_components/Summary'
import Button from '@/components/shared/Button'
import { Suspense } from 'react'
import Spinner, { Size } from '@/components/shared/Spinner'

export default function UserPage() {
  return (
    <Suspense fallback={<Spinner size={Size.l} />}>
      <div className="animate-fade-in flex w-full flex-col justify-center gap-8 bg-white xl:flex-row">
        <div className="w-full xl:max-w-[300px]">
          <div className="flex h-fit flex-col gap-8 bg-gray-50 px-4 py-8">
            <ProfileSection />
          </div>
          <Line className="my-8" />
          <div className="w-full px-4">
            <Button className="w-full">루틴 계획하기</Button>
          </div>
        </div>
        <div className="flex w-full flex-col px-4 xl:max-w-[768px]">
          <div className="flex flex-col gap-12">
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
