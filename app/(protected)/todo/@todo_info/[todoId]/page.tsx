import React from 'react'
import Line from '@/components/shared/Line'

import TitleSection from './_components/TitleSection'
import DateSection from './_components/DateSection'
import MemoSection from './_components/MemoSection'
import ButtonSection from './_components/ButtonSection'
import MouseEventSection from './_components/MouseEventSection'
import IsCompleteSection from './_components/IsCompleteSection'

interface Props {
  params: { todoId: string }
  searchParams: { folder_id: string }
}

export default function Page({ params, searchParams }: Props) {
  const todoId = params.todoId
  const folderId = searchParams.folder_id

  return (
    <div className="fixed inset-0 z-40">
      <MouseEventSection todoId={todoId} folderId={folderId}>
        <TitleSection todoId={todoId} folderId={folderId} />
        <div className="flex flex-1 flex-col gap-4">
          <Line />
          <DateSection todoId={todoId} folderId={folderId} />
          <Line />
          <MemoSection todoId={todoId} folderId={folderId} />
          <Line />
          <IsCompleteSection todoId={todoId} folderId={folderId} />
        </div>
        <ButtonSection todoId={todoId} folderId={folderId} />
      </MouseEventSection>
    </div>
  )
}
