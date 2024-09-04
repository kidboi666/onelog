'use client'

import { ReactElement, useState } from 'react'
import cn from '@/lib/cn'
import { supabase } from '@/lib/supabase/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { gardenQuery } from '@/services/queries/garden/gardenQuery'
import { Tables } from '@/types/supabase'
import { IDateBlock } from '@/types/garden'

import { DAYS_OF_WEEK } from '../_constants'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import Button from '@/components/shared/Button'
import GardenSortDropDown from './GardenSortDropDown'
import Icon from '@/components/shared/Icon'
import useStateChange from '@/hooks/useStateChange'
import useOutsideClick from '@/hooks/useOutsideClick'

/**
 * 인자로 주어진 년의 1월 1일의 요일을 구하는 함수
 */
const getFirstDayInYear = (year: number) => {
  return new Date(year, 0, 1).getDay()
}

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
 * 각 달의 일을 블록으로 렌더링 해주는 함수 + 색칠 (ver. 작성 갯수 기준 색칠)
 */
const getRenderedBlockFromWrittenLength = (
  months: number[],
  targetDays: Tables<'garden'>[],
) => {
  return months.map((days, i) => {
    let blocks = []
    const foundTargetMonth = targetDays.find(
      (v) => new Date(v.created_at).getMonth() === i,
    )
    for (let day = 1; day <= days; day++) {
      let foundTargetDays
      if (foundTargetMonth?.sentences) {
        foundTargetDays = foundTargetMonth.sentences.filter(
          (v, i) => new Date(v.created_at).getDate() === day,
        )
        if (foundTargetDays.length >= 1) {
          blocks.push(<Block key={day} length={foundTargetDays.length} />)
          continue
        }
      }
      blocks.push(<Block key={day} />)
    }
    return { month: i + 1, days: [...blocks] }
  })
}

/**
 * 각 달의 일을 블록으로 렌더링 해주는 함수 + 색칠 (ver. 이모션 레벨 기준 색칠)
 */
const getRenderedBlockFromEmotionLevel = (
  months: number[],
  targetDays: Tables<'garden'>[],
) => {
  return months.map((days, i) => {
    let blocks = []
    const foundTargetMonth = targetDays.find(
      (v) => new Date(v.created_at).getMonth() === i,
    )

    for (let day = 1; day <= days; day++) {
      let targetDaysForEmotionLevel
      if (foundTargetMonth?.sentences) {
        const targetDays = foundTargetMonth.sentences.filter(
          (v, i) => new Date(v.created_at).getDate() === day,
        )
        const levels = targetDays.map((v) =>
          Number(v.emotion_level.replace('%', '')),
        )
        const sum = levels.reduce((total, num) => total + num, 0)
        targetDaysForEmotionLevel = sum / levels.length
        if (targetDaysForEmotionLevel) {
          blocks.push(<Block key={day} average={targetDaysForEmotionLevel} />)
          continue
        }
      }
      blocks.push(<Block key={day} />)
    }
    return { month: i + 1, days: [...blocks] }
  })
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
        emptyBlock.push(<Block key={i} empty />)
      }
      return trueResult.push([...emptyBlock], data.days)
    }
    return trueResult.push(data.days)
  })

  return [...trueResult]
}

export default function Garden() {
  const { data } = useSuspenseQuery(gardenQuery.getGarden(supabase))
  const [orderBy, setOrderBy] = useState('length')

  const currentYear = new Date().getFullYear()
  const firstDayIndex = getFirstDayInYear(currentYear)
  const shouldRenderElement =
    orderBy === 'emotion'
      ? getRenderedBlockFromEmotionLevel(getDaysInYear(currentYear), data)
      : getRenderedBlockFromWrittenLength(getDaysInYear(currentYear), data)

  const handleSortOrder = (order: 'emotion' | 'length') => {
    setOrderBy(order)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex justify-between">
        <Title>한 눈에 보기</Title>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleSortOrder('length')}
          >
            문장 갯수
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleSortOrder('emotion')}
          >
            감정 농도 평균
          </Button>
        </div>
      </div>
      <div className="flex flex-col overflow-x-auto p-1">
        <GardenBlock
          shouldRenderElement={shouldRenderElement}
          firstDayIndex={firstDayIndex}
        />
      </div>
      <div className="flex items-center gap-2 self-end">
        <Text type="caption" size="sm" className="leading-none">
          {orderBy === 'emotion' ? 'Bad' : 'Less'}
        </Text>
        <Block />
        <Block length={1} />
        <Block length={2} />
        <Block length={3} />
        <Block length={4} />
        <Text type="caption" size="sm">
          {orderBy === 'emotion' ? 'Good' : 'More'}
        </Text>
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
      <div className="flex gap-1">
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
  className?: string
  length?: number
  average?: number
}

function Block({ length, empty, average }: BlockProps) {
  let sentencesColor
  if (length) {
    if (length === 1) {
      sentencesColor = 'bg-blue-100'
    } else if (length === 2) {
      sentencesColor = 'bg-blue-200'
    } else if (length === 3) {
      sentencesColor = 'bg-blue-300'
    } else {
      sentencesColor = 'bg-blue-400'
    }
  }
  if (average) {
    if (average <= 25) {
      sentencesColor = 'bg-blue-100'
    } else if (average <= 50) {
      sentencesColor = 'bg-blue-200'
    } else if (average <= 75) {
      sentencesColor = 'bg-blue-300'
    } else {
      sentencesColor = 'bg-blue-400'
    }
  }
  return (
    <div
      className={cn(
        'size-2.5 select-none rounded-sm text-center text-[7px] ring-1 ring-gray-300 transition hover:opacity-55',
        empty ? 'opacity-0' : '',
        length ? `${sentencesColor}` : '',
        average ? `${sentencesColor}` : '',
      )}
    />
  )
}
