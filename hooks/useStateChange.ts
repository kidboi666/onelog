import { wait } from '@/utils/wait'
import { useRef } from 'react'

export default function useStateChange<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  const open = async () => {
    if (ref.current) {
      ref.current.classList.remove('hidden')
      await wait(10)
      ref.current.setAttribute('data-status', 'opened')
    }
  }

  const close = () => {
    if (ref.current) {
      ref.current.setAttribute('data-status', 'closed')
    }
  }

  const handleTransitionEnd = () => {
    if (ref?.current?.getAttribute('data-status') === 'closed') {
      ref.current.classList.add('hidden')
    }
  }

  const handleButtonClick = () => {
    const isOpen = ref.current?.getAttribute('data-status')

    if (isOpen === 'opened') {
      close()
    }

    if (isOpen === 'closed') {
      open()
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
