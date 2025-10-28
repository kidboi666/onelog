'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { ReactElement, useMemo, useState } from 'react'
import { useMe } from '@/src/store/hooks/useMe'
import { gardenQuery } from '@/src/services/queries/garden/garden-query'
import { IDateBlock } from '@/src/types/dtos/garden'
import { Tables } from '@/src/types/supabase'
import { getDaysInYear, getFirstDayInYear } from '@/src/utils/client-utils'
import { YStack } from '@/src/components/Stack'
import Title from '@/src/components/Title'
import Block from '../_components/Block'
import ColorInfoDisplay from '../_components/ColorInfoDisplay'
import GardenBlockSection from '../_components/GardenBlockSection'
import YearSection from '../_components/YearSection'

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
      if (foundTargetMonth?.posts) {
        const targetDays = foundTargetMonth.posts.filter(
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
              blockInfo={{ month: i + 1, date: day, weekDay, year }}
              average={targetDaysForEmotionLevel}
            />,
          )
          continue
        }
      }
      blocks.push(
        <Block
          key={day}
          blockInfo={{ month: i + 1, date: day, weekDay, year }}
        />,
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

interface Props {
  params: { userId: string }
}

export default function Garden({ params }: Props) {
  const userId = params.userId
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const { me } = useMe()
  const signedYear = new Date(me?.createdAt || '').getFullYear()

  const firstDayIndex = getFirstDayInYear(selectedYear)
  const { data: garden } = useSuspenseQuery(
    gardenQuery.getGarden(userId, selectedYear),
  )
  const shouldRenderElement = getRenderedBlockFromEmotionLevel(
    selectedYear,
    getDaysInYear(selectedYear),
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
    <div className="animate-fade-in">
      <YStack gap={8}>
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
      </YStack>
    </div>
  )
}
