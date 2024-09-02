import { Suspense } from 'react'
import { formatDateToYMD } from '@/utils/formatDate'
import Title from '@/components/shared/Title'
import { WEEKDAY } from './_constants'
import WritingFormSection from './_components/WritingFormSection'
import Spinner, { Size } from '@/components/shared/Spinner'

export default function WritePage() {
  return (
    <Suspense fallback={<Spinner size={Size.l} />}>
      <div className="animate-fade-in mt-20 flex w-full flex-col items-center justify-between gap-20 px-4 md:px-12 xl:max-w-[768px]">
        <Title>
          {`${formatDateToYMD(new Date().toString())}(${WEEKDAY[new Date().getDay()]}) 기록`}
        </Title>
        <WritingFormSection />
      </div>
    </Suspense>
  )
}
