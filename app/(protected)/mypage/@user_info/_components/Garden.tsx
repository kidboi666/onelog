'use client'

import { PropsWithChildren, ReactElement } from 'react'
import cn from '@/lib/cn'
import { supabase } from '@/lib/supabase/client'
import { useSuspenseQuery } from '@tanstack/react-query'

import { IDateBlock } from '@/types/garden'
import { gardenQuery } from '@/services/queries/garden/gardenQuery'
import { DAYS_OF_WEEK } from '../_constants'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'

/**
 * 인자로 주어진 년의 1월 1일의 요일을 구하는 함수
 */
const getFirstDayInYear = (year: number) => {
  return new Date(year, 0, 1).getDay()
}

/**
 * 각 달의 일을 블록으로 렌더링 해주는 함수
 */
const getRenderedBlock = (months: number[]) => {
  return months.map((days, i) => {
    let blocks = []
    for (let day = 1; day <= days; day++) {
      blocks.push(<Block>{day}</Block>)
    }
    return { month: i + 1, days: [...blocks] }
  })
}

/**
 * 받아온 데이터를 계산하기 편하게 바꿔주는 함수
 */
const getWrittenDate = () => {}

/**
 * 인자로 받는 년의 각 달의 일수를 구하는 함수
 */
const getDaysInYear = (year: number) => {
  const daysInYear = []
  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    daysInYear.push(daysInMonth)
  }
  return daysInYear
}

/**
 * 계산된 365개의 요소가 든 배열에 1월1일과 일요일로 시작되는 구간의 줄맞춤을 위해 빈블럭을 채워넣는 함수
 */
const createEmptySpaceByWeekday = (
  yearMonth: IDateBlock[],
  firstDayIndex: number,
) => {
  const trueResult: ReactElement[][] = []

  yearMonth.map((data, i) => {
    if (data.month === 1 && i < 1) {
      let emptyBlock: ReactElement[] = []

      for (let i = 0; i < firstDayIndex; i++) {
        emptyBlock.push(<Block empty />)
      }
      return trueResult.push([...emptyBlock], data.days)
    }
    return trueResult.push(data.days)
  })

  return [...trueResult]
}

const gardenColorizeByDate = () => {
  return
}

export default function Garden() {
  const { data: hasSentenceMonth } = useSuspenseQuery(
    gardenQuery.getGarden(supabase),
  )
  const currentYear = new Date().getFullYear()
  const firstDayIndex = getFirstDayInYear(currentYear)
  const shouldRenderElement = getRenderedBlock(getDaysInYear(currentYear))

  const whatMonths = hasSentenceMonth.map((data) => {
    const pickMonth = new Date(data.created_at).getMonth() + 1
    const pickYear = new Date(data.created_at).getFullYear()
    const pickSentences = data?.sentences?.map((sentence) => sentence)

    return { month: pickMonth, sentence: pickSentences }
  })
  console.log(hasSentenceMonth)
  return (
    <div className="flex flex-col gap-4 overflow-x-auto">
      <Title>한 눈에 보기</Title>
      <div className="flex flex-col pb-1">
        <GardenBlock
          whatMonths={whatMonths}
          shouldRenderElement={shouldRenderElement}
          firstDayIndex={firstDayIndex}
        />
      </div>
    </div>
  )
}

interface Props {
  shouldRenderElement: IDateBlock[]
  firstDayIndex: number
}

function GardenBlock({ shouldRenderElement, firstDayIndex }: Props) {
  return (
    <>
      <div className="flex gap-2">
        <div className="grid grid-rows-7">
          {DAYS_OF_WEEK.map((day) => (
            <Text key={day} type="caption" className="h-1 text-[10px]">
              {day}
            </Text>
          ))}
        </div>
        <div>
          <div className="grid grid-flow-col grid-rows-7 gap-1">
            {createEmptySpaceByWeekday(shouldRenderElement, firstDayIndex)}
          </div>
        </div>
      </div>
    </>
  )
}

interface BlockProps {
  empty?: boolean
}

function Block({ children, empty }: PropsWithChildren<BlockProps>) {
  return (
    <div
      className={cn(
        'size-2.5 select-none rounded-sm text-center text-[7px] ring-1 ring-gray-300 hover:bg-gray-300',
        empty ? 'opacity-0' : '',
      )}
    >
      {children}
    </div>
  )
}
