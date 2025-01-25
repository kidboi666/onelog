'use client'

import React, { useEffect, useRef } from 'react'
import cn from '@/src/lib/cn'
import { useToast } from '@/src/store/useToast'
import { XStack, YStack } from '@/src/components/Stack'
import TextDisplay from '@/src/components/TextDisplay'
import Button from './Button'
import Icon from './Icon'

interface Props {
  id: number
  text: string
  type: 'info' | 'success' | 'warning' | 'error'
  message?: string
}

export default function Toast({ id, type, text, message }: Props) {
  const { closeToast } = useToast()
  const toastRef = useRef<HTMLDivElement>(null)

  const handleClose = () => {
    toastRef.current?.setAttribute('data-status', 'closed')
    setTimeout(() => closeToast(id), 500)
  }

  useEffect(() => {
    const closeTimeout = setTimeout(() => {
      handleClose()
    }, 3000)

    return () => {
      clearTimeout(closeTimeout)
    }
  }, [id, closeToast])

  return (
    <div
      ref={toastRef}
      data-status="opened"
      className="flex w-80 origin-right animate-fade-in flex-col gap-2 rounded-md bg-white/85 p-4 shadow-lg ring-1 ring-zinc-300 backdrop-blur-md transition duration-300 ease-in-out data-[status=closed]:translate-x-4 data-[status=closed]:opacity-0 dark:bg-zinc-800/85 dark:ring-zinc-700"
    >
      <XStack className="items-center">
        <Button
          variant="icon"
          size="none"
          className={cn(
            'rounded-full text-white dark:text-white',
            type === 'success' && 'bg-green-400 dark:bg-green-500',
            type === 'info' && 'bg-zinc-400 dark:bg-zinc-500',
            type === 'warning' && 'bg-yellow-400 dark:bg-yellow-500',
            type === 'error' && 'bg-red-400 dark:bg-red-500',
          )}
        >
          <Icon view="0 -960 960 960" size={14}>
            <path d="M480-120q-33 0-56.5-23.5T400-200q0-33 23.5-56.5T480-280q33 0 56.5 23.5T560-200q0 33-23.5 56.5T480-120Zm-80-240v-480h160v480H400Z" />
          </Icon>
        </Button>
        <TextDisplay type="caption" size="sm" className="flex-1">
          {(type === 'success' && '요청 성공') ||
            (type === 'error' && '요청 실패')}
        </TextDisplay>
        <Button
          variant="icon"
          size="icon"
          onClick={() => {
            setTimeout(() => handleClose())
          }}
          className="p-0"
        >
          <Icon view="0 -960 960 960" size={14}>
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </Icon>
        </Button>
      </XStack>
      <YStack>
        <TextDisplay>{text}</TextDisplay>
        {message && <TextDisplay size="xs">{message}</TextDisplay>}
      </YStack>
    </div>
  )
}
