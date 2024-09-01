'use client'

import { isServer } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

export default function Portal({ children }: PropsWithChildren) {
  const element = !isServer && document.getElementById('portal')
  if (!element) return null

  return createPortal(children, element)
}
