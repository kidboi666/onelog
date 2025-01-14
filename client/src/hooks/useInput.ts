'use client'

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

export type TChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

export default function useInput<T extends string | number | null>(
  initValue: T,
): [T, (e: TChangeEvent) => void, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initValue)

  const handleInputChange = (e: TChangeEvent) => {
    setValue(e.target.value as T)
  }

  return [value, handleInputChange, setValue]
}
