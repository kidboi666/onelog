'use client'

import Text from './Text'

export default function Toast() {
  return (
    <div className="fixed bottom-10 right-10 z-50 rounded-md bg-green-600 p-2 shadow-sm">
      <Text>안녕하세요 토스트 입니다.</Text>
    </div>
  )
}
