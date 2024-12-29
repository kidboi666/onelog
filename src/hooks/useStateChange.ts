'use client'

import { useRef } from 'react'
import { wait } from '@/src/utils/wait'

export default function useDataDrivenAnimation<T extends HTMLElement>(
  initClass: string = 'hidden',
) {
  const ref = useRef<T>(null)

  const open = async (): Promise<void> => {
    const element = ref.current
    if (element) {
      element.classList.remove(initClass)
      await wait(10)
      element.setAttribute('data-status', 'opened')
    }
  }

  const close = async (): Promise<void> => {
    await wait(10)
    ref.current?.setAttribute('data-status', 'closed')
  }

  const handleTransitionEnd = (): void => {
    const element = ref.current
    if (
      element?.getAttribute('data-status') === 'closed' &&
      !element.classList.contains(initClass)
    ) {
      element.classList.add(initClass)
    }
  }

  const handleButtonClick = (): void => {
    const isOpen = ref.current?.getAttribute('data-status')

    if (isOpen === 'opened') {
      void close()
    } else if (isOpen === 'closed') {
      void open()
    }
  }

  return {
    ref,
    open,
    close,
    onTransitionEnd: handleTransitionEnd,
    onClick: handleButtonClick,
  }
}
