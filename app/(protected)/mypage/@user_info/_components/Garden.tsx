'use client'

import { ReactElement, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { gardenQuery } from '@/services/queries/garden/gardenQuery'
import { meQuery } from '@/services/queries/auth/meQuery'
import { Tables } from '@/types/supabase'
import { IDateBlock } from '@/types/garden'

import { DAYS_OF_WEEK } from '../_constants'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import Button from '@/components/shared/Button'
import Container from '@/components/shared/Container'
import Block from '@/components/shared/Block'
import { getDaysInYear, getFirstDayInYear } from '@/utils/formatDate'
import Box from '@/components/shared/Box'

/**
 * 각 달의 일을 블록으로 렌더링 해주는 함수 + 색칠 (ver. 작성 갯수 기준 색칠)
 */
export const getRenderedBlockFromWrittenLength = (
  year: number,
  months: number[],
  targetDays: Tables<'garden'>[],
) => {
  return months.map((days, i) => {
    let blocks = []
    const foundTargetMonth = targetDays.find(
      (v) => new Date(v.created_at).getMonth() === i,
    )
    for (let day = 1; day <= days; day++) {
      const weekDay = new Date(year, i, day).getDay()
      let foundTargetDays
      if (foundTargetMonth?.sentences) {
        foundTargetDays = foundTargetMonth.sentences.filter(
          (v: any, i) => new Date(v?.created_at).getDate() === day,
        )
        if (foundTargetDays.length >= 1) {
          blocks.push(
            <Block
              key={day}
              summary={foundTargetDays}
              blockInfo={{ month: i + 1, date: day, weekDay }}
              length={foundTargetDays.length}
            />,
          )
          continue
        }
      }
      blocks.push(
        <Block key={day} blockInfo={{ month: i + 1, date: day, weekDay }} />,
      )
    }
    return { month: i + 1, days: [...blocks] }
  })
}

/**
 * 각 달의 일을 블록으로 렌더링 해주는 함수 + 색칠 (ver. 이모션 레벨 기준 색칠)
 */
const getRenderedBlockFromEmotionLevel = (
  year: number,
  months: number[],
  targetDays: Tables<'garden'>[],
) => {
  return months.map((days, i) => {
    let blocks = []
    const foundTargetMonth = targetDays.find(
      (v) => new Date(v.created_at).getMonth() === i,
    )

    for (let day = 1; day <= days; day++) {
      const weekDay = new Date(year, i + 1, day).getDay()
      let targetDaysForEmotionLevel
      if (foundTargetMonth?.sentences) {
        const targetDays = foundTargetMonth.sentences.filter(
          (v: any, i) => new Date(v.created_at).getDate() === day,
        )
        const levels = targetDays.map((v: any) =>
          Number(v.emotion_level.replace('%', '')),
        )
        const sum = levels.reduce((total, num) => total + num, 0)
        targetDaysForEmotionLevel = sum / levels.length
        if (targetDaysForEmotionLevel) {
          blocks.push(
            <Block
              key={day}
              summary={targetDays}
              blockInfo={{ month: i + 1, date: day, weekDay }}
              average={targetDaysForEmotionLevel}
            />,
          )
          continue
        }
      }
      blocks.push(
        <Block key={day} blockInfo={{ month: i + 1, date: day, weekDay }} />,
      )
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
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data } = useSuspenseQuery(gardenQuery.getGarden(supabase, me.sub))
  const [orderBy, setOrderBy] = useState('length')

  const currentYear = new Date().getFullYear()
  const firstDayIndex = getFirstDayInYear(currentYear)
  const shouldRenderElement =
    orderBy === 'emotion'
      ? getRenderedBlockFromEmotionLevel(
          currentYear,
          getDaysInYear(currentYear),
          data,
        )
      : getRenderedBlockFromWrittenLength(
          currentYear,
          getDaysInYear(currentYear),
          data,
        )

  const handleSortOrder = (order: 'emotion' | 'length') => {
    setOrderBy(order)
  }

  return (
    <Container className="flex flex-col gap-4">
      <Box className="relative flex justify-between">
        <Title>한 눈에 보기</Title>
        <Box className="flex gap-2">
          <Button
            size="sm"
            variant={orderBy === 'length' ? 'primary' : 'secondary'}
            onClick={() => handleSortOrder('length')}
          >
            문장 갯수
          </Button>
          <Button
            size="sm"
            variant={orderBy === 'emotion' ? 'primary' : 'secondary'}
            onClick={() => handleSortOrder('emotion')}
          >
            감정 농도
          </Button>
        </Box>
      </Box>
      <Box className="flex flex-col overflow-x-auto overflow-y-visible p-1">
        <GardenBlockSection
          shouldRenderElement={shouldRenderElement}
          firstDayIndex={firstDayIndex}
        />
      </Box>
      <Box className="flex items-center gap-2 self-end">
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
      </Box>
    </Container>
  )
}

interface GardenBlockSectionProps {
  shouldRenderElement: IDateBlock[]
  firstDayIndex: number
}

function GardenBlockSection({
  shouldRenderElement,
  firstDayIndex,
}: GardenBlockSectionProps) {
  return (
    <>
      <Container className="flex gap-2">
        <Box className="grid grid-rows-7 gap-1">
          {DAYS_OF_WEEK.map((day) => (
            <Text key={day} type="caption" className="h-1 text-[10px]">
              {day}
            </Text>
          ))}
        </Box>
        <Box>
          <Box className="grid grid-flow-col grid-rows-7 gap-1">
            {createEmptySpaceByWeekday(shouldRenderElement, firstDayIndex)}
          </Box>
        </Box>
      </Container>
    </>
  )
}
