import { RefObject, useRef } from 'react'

export default function useStateChange<T extends HTMLElement>(): [
  RefObject<T>,
  () => void,
  () => void,
] {
  const targetRef = useRef<T>(null)

  const handleOpen = () => {
    if (targetRef.current) {
      targetRef.current.setAttribute('data-status', 'opened')
    }
  }

  const handleClose = () => {
    if (targetRef.current) {
      targetRef.current.setAttribute('data-status', 'closed')
    }
  }

  return [targetRef, handleOpen, handleClose]
}
