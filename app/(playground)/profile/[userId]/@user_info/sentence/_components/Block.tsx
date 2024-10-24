'use client'

import { ISentenceState, useSentence } from '@/store/useSentence'
import { colorTheme, useTheme } from '@/store/useTheme'
import { IBlockInfo } from '@/types/garden'
import { useRef } from 'react'
import cn from '@/lib/cn'
import { colorizeOpacity } from '@/utils/formatColor'
import Button from '@/components/shared/Button'
import Text from '@/components/shared/Text'
import { WEEKDAY } from '@/app/(playground)/write/sentence/_constants'
import { Json } from '@/types/supabase'

interface BlockProps {
  empty?: boolean
  className?: string
  length?: number
  average?: number
  summary?: Json[] | null
  blockInfo?: IBlockInfo
  disabled?: boolean
}

export default function Block({
  className,
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

  const calculateMonthPoint = (blockInfo: IBlockInfo) => {
    const targetDate = blockInfo.weekDay
    const calculateMargin = 16 * (targetDate + 1) + 2
    return calculateMargin
  }

  return (
    <div className="relative">
      {blockInfo?.date === 1 && (
        <div
          className="absolute text-nowrap"
          style={{ top: -calculateMonthPoint(blockInfo) }}
        >
          <Text type="caption" size="xs">
            {`${blockInfo?.month}월`}
          </Text>
        </div>
      )}
      <Button
        variant="none"
        size="none"
        onMouseEnter={() =>
          infoRef.current?.setAttribute('data-status', 'opened')
        }
        onMouseLeave={() =>
          infoRef.current?.setAttribute('data-status', 'closed')
        }
        disabled={disabled}
        onClick={() => setSentences(summary as never as ISentenceState[])}
        className={cn(
          'size-3 select-none overflow-hidden rounded-[4px] border border-zinc-300 shadow-sm dark:border-zinc-700 dark:shadow-zinc-800',
          className,
        )}
      >
        <div
          className={cn(
            'size-full text-center text-[7px] opacity-0 hover:opacity-55',
            colorTheme({ color }),
            length && `${colorizeOpacity(length, [1, 2, 3])}`,
            average && `${colorizeOpacity(average, [25, 50, 75])}`,
          )}
        />
      </Button>
      {blockInfo && (
        <div
          ref={infoRef}
          data-status="closed"
          className={cn(
            'absolute z-30 flex h-fit w-fit items-center justify-center text-nowrap rounded-md bg-white p-1 shadow-md transition data-[status=closed]:scale-0 dark:bg-var-darkgray',
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
        </div>
      )}
    </div>
  )
}
