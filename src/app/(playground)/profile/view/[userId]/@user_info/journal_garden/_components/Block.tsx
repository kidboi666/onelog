'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useRef } from 'react'
import cn from '@/src/lib/cn'
import { colorTheme, useTheme } from '@/src/store/hooks/useTheme'
import { IBlockInfo } from '@/src/types/dtos/garden'
import { colorizeOpacity } from '@/src/utils/client-utils'
import Button from '@/src/components/Button'
import TextDisplay from '@/src/components/TextDisplay'
import { WEEKDAY } from '@/src/app/(playground)/post/edit/_constants'

interface BlockProps {
  empty?: boolean
  className?: string
  average?: number
  blockInfo?: IBlockInfo
  disabled?: boolean
}

export default function Block({
  className,
  empty,
  average,
  blockInfo,
  disabled,
}: BlockProps) {
  const router = useRouter()
  const infoRef = useRef<HTMLDivElement>(null)
  const { color } = useTheme()
  const searchParams = useSearchParams()
  const selectedDate = {
    year: Number(searchParams.get('year')),
    month: Number(searchParams.get('month')),
    date: Number(searchParams.get('date')),
  }
  const isSelected =
    selectedDate.year === blockInfo?.year &&
    selectedDate.month === blockInfo?.month &&
    selectedDate.date === blockInfo?.date

  if (empty) {
    return <div className="size-2.5 select-none opacity-0" />
  }

  const calculateMonthPoint = (blockInfo: IBlockInfo) => {
    const targetDate = blockInfo.weekDay
    const calculateMargin = 16 * (targetDate + 1) + 2
    return calculateMargin
  }

  const handleBlockClick = () => {
    infoRef.current?.setAttribute('data-status', 'closed')

    router.push(
      `?year=${blockInfo?.year}&month=${blockInfo?.month}&date=${blockInfo?.date}`,
    )
  }

  return (
    <div className="relative">
      {blockInfo?.date === 1 && (
        <div
          className="absolute text-nowrap"
          style={{ top: -calculateMonthPoint(blockInfo) }}
        >
          <TextDisplay type="caption" size="xs">
            {`${blockInfo?.month}월`}
          </TextDisplay>
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
        onClick={handleBlockClick}
        className={cn(
          'size-3 select-none overflow-hidden rounded-[4px] border border-zinc-300 shadow-sm active:scale-75 dark:border-zinc-700 dark:shadow-zinc-800',
          className,
        )}
      >
        <div
          className={cn(
            'absolute size-full rounded-[4px]',
            isSelected && 'animate-ping ring-2',
          )}
        />
        <div
          className={cn(
            'size-full text-center text-[7px] opacity-0 hover:opacity-55',
            colorTheme({ color }),
            average && `${colorizeOpacity(average)}`,
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
          <TextDisplay
            type="caption"
            size="sm"
            className="select-none"
          >{`${blockInfo.month} / ${blockInfo.date} / ${WEEKDAY[blockInfo.weekDay]}`}</TextDisplay>
        </div>
      )}
    </div>
  )
}
