'use client'

import { useSentence } from '@/store/useSentence'
import { useTheme } from '@/store/useTheme'
import { IBlockInfo } from '@/types/garden'
import { useRef } from 'react'
import Container from './Container'
import Box from './Box'
import cn from '@/lib/cn'
import Text from './Text'
import { WEEKDAY } from '@/app/(protected)/(modals)/post/sentence/_constants'
import { colorizeOpacity, formatBlockColor } from '@/utils/formatColor'
import RefBox from './RefBox'
import Button from './Button'

interface BlockProps {
  empty?: boolean
  className?: string
  length?: number
  average?: number
  summary?: any
  blockInfo?: IBlockInfo
  disabled?: boolean
}

export default function Block({
  length,
  empty,
  average,
  summary,
  blockInfo,
  disabled,
}: BlockProps) {
  const infoRef = useRef<HTMLDivElement>(null)
  const { setSentences } = useSentence()
  const { color } = useTheme()

  if (empty) {
    return <div className="size-2.5 select-none opacity-0" />
  }

  return (
    <Container className="relative">
      <Button
        variant="emptyStyle"
        size="emptyStyle"
        onMouseEnter={() =>
          infoRef.current?.setAttribute('data-status', 'opened')
        }
        onMouseLeave={() =>
          infoRef.current?.setAttribute('data-status', 'closed')
        }
        disabled={disabled}
        onClick={() => setSentences(summary)}
        className="size-2.5 cursor-auto select-none overflow-hidden rounded-sm ring-1 ring-gray-300 dark:ring-gray-700"
      >
        <Box
          className={cn(
            'size-full text-center text-[7px] opacity-0 hover:opacity-55',
            formatBlockColor(color),
            length && `${colorizeOpacity(length, [1, 2, 3])}`,
            average && `${colorizeOpacity(average, [25, 50, 75])}`,
          )}
        />
      </Button>
      {blockInfo && (
        <RefBox
          ref={infoRef}
          data-status="closed"
          className={cn(
            'absolute z-30 flex h-fit w-fit items-center justify-center text-nowrap rounded-md bg-white p-1 shadow-lg transition data-[status=closed]:scale-0',
            blockInfo.month! > 10
              ? 'right-full origin-top-right'
              : 'left-full origin-top-left',
            blockInfo.weekDay >= 5 ? 'bottom-0' : 'top-0',
          )}
        >
          <Text
            type="caption"
            size="sm"
            className="select-none"
          >{`${blockInfo.month} / ${blockInfo.date} / ${WEEKDAY[blockInfo.weekDay]}`}</Text>
        </RefBox>
      )}
    </Container>
  )
}
