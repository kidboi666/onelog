import type { IDateBlock } from '@/entities/garden/api/dtos'
import { DAYS_OF_WEEK } from '../../../_constants'
import { createEmptySpaceByWeekday } from '../@garden/default'

interface GardenBlockSectionProps {
  shouldRenderElement: IDateBlock[]
  firstDayIndex: number
}

export default function GardenBlockSection({
  shouldRenderElement,
  firstDayIndex,
}: GardenBlockSectionProps) {
  return (
    <div className="flex h-fit flex-col gap-2 overflow-x-auto p-1 garden-scrollbar-light dark:gardent-scrollbar-dark">
      <div className="mt-4 flex gap-2">
        <div className="grid grid-rows-7 gap-1">
          {DAYS_OF_WEEK.map((day) => (
            <span key={day} className="h-1 text-muted-foreground text-[10px]">
              {day}
            </span>
          ))}
        </div>
        <div className="grid grid-flow-col grid-rows-7 gap-1">
          {createEmptySpaceByWeekday(shouldRenderElement, firstDayIndex)}
        </div>
      </div>
    </div>
  )
}
