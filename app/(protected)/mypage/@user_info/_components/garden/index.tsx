'use client'

import { ReactElement, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { gardenQuery } from '@/services/queries/garden/gardenQuery'
import { meQuery } from '@/services/queries/auth/meQuery'
import { Tables } from '@/types/supabase'
import { IDateBlock } from '@/types/garden'
import { getDaysInYear, getFirstDayInYear } from '@/utils/formatDate'

import Title from '@/components/shared/Title'
import SortOptionMenu from '@/components/feature/my_sentence/SortOptionMenu'
import GardenBlockSection from '@/components/feature/my_sentence/GardenBlockSection'
import ColorInfoDisplay from '@/components/feature/my_sentence/ColorInfoDisplay'
import Block from '@/components/feature/my_sentence/Block'

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
      const weekDay = new Date(year, i, day).getDay()
      let targetDaysForEmotionLevel
      if (foundTargetMonth?.sentences) {
        const targetDays = foundTargetMonth.sentences.filter(
          (v: any) => new Date(v.created_at).getDate() === day,
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
export const createEmptySpaceByWeekday = (
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
  const { data: garden } = useSuspenseQuery(
    gardenQuery.getGarden(supabase, me?.userId),
  )
  const [orderBy, setOrderBy] = useState('length')
  console.log(garden)
  const currentYear = new Date().getFullYear()
  const firstDayIndex = getFirstDayInYear(currentYear)
  const shouldRenderElement =
    orderBy === 'emotion'
      ? getRenderedBlockFromEmotionLevel(
          currentYear,
          getDaysInYear(currentYear),
          garden,
        )
      : getRenderedBlockFromWrittenLength(
          currentYear,
          getDaysInYear(currentYear),
          garden,
        )

  const handleSortOrder = (order: 'emotion' | 'length') => {
    setOrderBy(order)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex justify-between">
        <Title>한 눈에 보기</Title>
        <SortOptionMenu orderBy={orderBy} onSortOrder={handleSortOrder} />
      </div>
      <GardenBlockSection
        shouldRenderElement={shouldRenderElement}
        firstDayIndex={firstDayIndex}
      />
      <ColorInfoDisplay orderBy={orderBy} />
    </div>
  )
}
