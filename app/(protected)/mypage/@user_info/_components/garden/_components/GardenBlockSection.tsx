import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import { IDateBlock } from '@/types/garden'
import { DAYS_OF_WEEK } from '../_constants'
import Text from '@/components/shared/Text'
import { createEmptySpaceByWeekday } from '..'
import cn from '@/lib/cn'

interface GardenBlockSectionProps {
  shouldRenderElement: IDateBlock[]
  firstDayIndex: number
}

export default function GardenBlockSection({
  shouldRenderElement,
  firstDayIndex,
}: GardenBlockSectionProps) {
  return (
    <Container
      className={cn(
        'garden_scrollbar flex h-fit flex-col gap-2 overflow-x-auto p-1',
      )}
    >
      <Box row className="mt-4 gap-2">
        <Box className="grid grid-rows-7 gap-1">
          {DAYS_OF_WEEK.map((day) => (
            <Text key={day} type="caption" className="h-1 text-[10px]">
              {day}
            </Text>
          ))}
        </Box>
        <Box className="grid grid-flow-col grid-rows-7 gap-1">
          {createEmptySpaceByWeekday(shouldRenderElement, firstDayIndex)}
        </Box>
      </Box>
    </Container>
  )
}
