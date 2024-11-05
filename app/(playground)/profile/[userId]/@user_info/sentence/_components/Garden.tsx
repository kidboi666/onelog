'use client'

import { ReactElement, useMemo, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { gardenQuery } from '@/services/queries/garden/gardenQuery'
import { Tables } from '@/types/supabase'
import { IDateBlock } from '@/types/garden'
import { getDaysInYear, getFirstDayInYear } from '@/utils/formatDate'

import Title from '@/components/shared/Title'
import { usePathname } from 'next/navigation'
import Block from './Block'
import GardenBlockSection from './GardenBlockSection'
import ColorInfoDisplay from './ColorInfoDisplay'
import YearSection from './YearSection'
import { meQuery } from '@/services/queries/auth/meQuery'

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
          Number(v.emotion_level?.replace('%', '')),
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
  const pathname = usePathname()
  const [_, __, userId] = pathname.split('/')
  const { data: me } = useSuspenseQuery(meQuery.getUserInfo(supabase, userId))
  const { data: garden } = useSuspenseQuery(
    gardenQuery.getGarden(supabase, userId),
  )
  const currentYear = new Date().getFullYear()
  const signedYear = new Date(me?.created_at).getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const firstDayIndex = getFirstDayInYear(currentYear)
  const shouldRenderElement = getRenderedBlockFromEmotionLevel(
    currentYear,
    getDaysInYear(currentYear),
    garden,
  )
  const yearList = useMemo(
    () =>
      Array.from(
        { length: currentYear - signedYear + 1 },
        (_, index) => currentYear - index,
      ),
    [signedYear, currentYear],
  )

  const handleSelect = (year: number) => {
    setSelectedYear(year)
  }

  return (
    <>
      <div className="flex flex-col justify-between sm:flex-row">
        <Title>감정 한 눈에 보기</Title>
        <YearSection
          yearList={yearList}
          selectedYear={selectedYear}
          onSelect={handleSelect}
        />
      </div>
      <GardenBlockSection
        shouldRenderElement={shouldRenderElement}
        firstDayIndex={firstDayIndex}
      />
      <ColorInfoDisplay />
    </>
  )
}
