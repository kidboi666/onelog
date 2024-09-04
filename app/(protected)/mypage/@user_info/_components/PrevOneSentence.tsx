'use client'

import Title from '@/components/shared/Title'
import ProfileSentenceItem from '@/components/sentence/ProfileSentenceItem'
import { useSentence } from '@/store/useSentence'

export default function PrevOneSentence() {
  const { sentences } = useSentence()

  return (
    <div className="flex flex-col gap-4">
      <Title>그날의 한 문장</Title>
      <div className="flex flex-col">
        {sentences?.map((item) => (
          <ProfileSentenceItem key={item.id} sentence={item} />
        ))}
      </div>
    </div>
  )
}
