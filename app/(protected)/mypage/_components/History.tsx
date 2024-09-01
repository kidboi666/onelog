import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { PropsWithChildren } from 'react'

const YEAR_MONTHS = [
  { month: 1, days: 31 },
  { month: 2, days: 28 },
  { month: 3, days: 31 },
  { month: 4, days: 30 },
  { month: 5, days: 31 },
  { month: 6, days: 30 },
  { month: 7, days: 31 },
  { month: 8, days: 31 },
  { month: 9, days: 30 },
  { month: 10, days: 31 },
  { month: 11, days: 30 },
  { month: 12, days: 31 },
]
const ONE_WEEK = ['월', '화', '수', '목', '금', '토', '일']

export default function History() {
  return (
    <div className="flex flex-col gap-4">
      <Title>한 눈에 보기</Title>
      <div className="flex flex-col pb-1">
        <div className="ml-4 flex w-full gap-12">
          {YEAR_MONTHS.map(({ month }) => (
            <Text key={month} type="caption" className="text-[10px]">
              {month}월
            </Text>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="grid grid-rows-7">
            {ONE_WEEK.map((day) => (
              <Text key={day} type="caption" className="h-1 text-[10px]">
                {day}
              </Text>
            ))}
          </div>
          <div className="grid grid-flow-col grid-rows-7 gap-1">
            {YEAR_MONTHS.map((month) => {
              let blocks = []
              for (let i = 0; i <= month.days; i++) {
                blocks.push(<Block>{month.month}</Block>)
              }
              return [...blocks]
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function Block({ children }: PropsWithChildren) {
  return (
    <div className="size-2.5 select-none rounded-sm text-center text-[7px] ring-1 ring-gray-300 hover:bg-gray-300" />
  )
}
