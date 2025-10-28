'use client'

import Empty from '@/src/components/Empty'
import { YStack } from '@/src/components/Stack'
import Title from '@/src/components/Title'

export default function Default() {
  return (
    <div className="animate-fade-in">
      <YStack gap={8}>
        <Title>그날의 기록</Title>
        <Empty isShadow>
          <Empty.Text>날짜를 선택해주세요.</Empty.Text>
        </Empty>
      </YStack>
    </div>
  )
}
