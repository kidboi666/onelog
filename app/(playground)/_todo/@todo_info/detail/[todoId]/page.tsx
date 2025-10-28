import React from 'react'
import DataAccess from './_components/DataAccess'
import MouseEventSection from './_components/MouseEventSection'

interface Props {
  params: { todoId: string }
  searchParams: {
    folder_id: string
    color: string
    order_from: 'main' | 'folder'
  }
}

export default async function Page({
  params: { todoId },
  searchParams: { folder_id: folderId, order_from: orderFrom, color },
}: Props) {
  return (
    <div className="fixed inset-0 z-40">
      <MouseEventSection todoId={todoId} folderId={folderId}>
        <DataAccess
          todoId={todoId}
          folderId={folderId}
          orderFrom={orderFrom}
          color={color}
        />
      </MouseEventSection>
    </div>
  )
}
