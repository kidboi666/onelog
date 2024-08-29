'use client'

import { useEffect } from 'react'

interface Props {
  size: Size
}

export enum Size {
  s = 20,
  m = 40,
  l = 60,
}

export default function Spinner({ size = Size.m }: Props) {
  useEffect(() => {
    const getLoader = async () => {
      const { ring2 } = await import('ldrs')
      ring2.register()
    }
    getLoader()
  }, [])
  return (
    <l-ring-2
      size={size}
      stroke="3"
      stroke-length="0.25"
      bg-opacity="0.1"
      speed="0.8"
      color="black"
    />
  )
}
