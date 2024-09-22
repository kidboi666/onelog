'use client'

import { PropsWithChildren, useEffect } from 'react'
import { useTodo } from '@/store/useTodo'
import cn from '@/lib/cn'

export default function Layout({ children }: PropsWithChildren) {
  const { selectedFolder, setTodos, setSuccessTodos } = useTodo()

  /**
   * 선택된 폴더의 todo 목록 가져오기
   */
  useEffect(() => {
    if (selectedFolder) {
      const selectedTodos = JSON.parse(
        localStorage.getItem(selectedFolder.id.toString())!,
      )

      setTodos(selectedTodos?.pending ?? [])
      setSuccessTodos(selectedTodos?.success ?? [])
    }
  }, [selectedFolder && selectedFolder.id])

  return (
    <div
      className={cn(
        'relative flex h-[calc(100dvh-80px)] w-full flex-col gap-4 overflow-x-auto p-4',
        selectedFolder?.dotColor === 'yellow' &&
          'bg-var-yellow/15 dark:bg-var-yellow/25',
        selectedFolder?.dotColor === 'orange' &&
          'bg-var-orange/15 dark:bg-var-orange/25',
        selectedFolder?.dotColor === 'black' && 'bg-black/15 dark:bg-black/25',
        selectedFolder?.dotColor === 'blue' &&
          'bg-var-blue/15 dark:bg-var-blue/25',
        selectedFolder?.dotColor === 'green' &&
          'bg-var-green/15 dark:bg-var-green/25',
        selectedFolder?.dotColor === 'red' &&
          'bg-red-500/15 dark:bg-red-500/25',
        selectedFolder?.dotColor === 'purple' &&
          'bg-purple-500/15 dark:bg-purple-500/25',
      )}
    >
      {children}
    </div>
  )
}
