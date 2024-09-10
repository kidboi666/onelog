'use client'

import { useSentence } from '@/store/useSentence'
import { useTheme } from '@/store/useTheme'
import { IBlockInfo } from '@/types/garden'
import { useRef } from 'react'
import cn from '@/lib/cn'
import { WEEKDAY } from '@/app/(protected)/(modals)/post/sentence/_constants'
import { colorizeOpacity, formatBlockColor } from '@/utils/formatColor'
import RefBox from '@/components/shared/RefBox'
import Button from '@/components/shared/Button'
import Text from '@/components/shared/Text'
import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'

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
    const calculateMargin = 14 * (targetDate + 1) + 2
    return calculateMargin
  }

  return (
    <Container className="relative">
      {blockInfo?.date === 1 && (
        <Box
          className="absolute text-nowrap"
          style={{ top: -calculateMonthPoint(blockInfo) }}
        >
          <Text type="caption" size="xs">
            {`${blockInfo?.month}월`}
          </Text>
        </Box>
      )}
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
        className={cn(
          'size-2.5 cursor-auto select-none overflow-hidden rounded-sm ring-1 ring-gray-300 dark:ring-white/20',
          className,
        )}
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
            'dark:bg-var-darkgray absolute z-30 flex h-fit w-fit items-center justify-center text-nowrap rounded-md bg-white p-1 shadow-md transition data-[status=closed]:scale-0',
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
