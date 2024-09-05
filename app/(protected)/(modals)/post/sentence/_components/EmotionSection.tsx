import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import EmotionBlock from './EmotionBlock'
import { EMOTION_STATUS } from '../_constants'
import { List } from '@/components/shared/List'
import { useTheme } from '@/store/useTheme'
import cn from '@/lib/cn'
import Box from '@/components/shared/Box'
import Icon from '@/components/shared/Icon'

interface Props {
  selectedStatus: any
  onStatusClick: any
}

export default function EmotionSection({
  selectedStatus,
  onStatusClick,
}: Props) {
  const { color } = useTheme()
  const colorizeOpacity = (order: number) => {
    if (order === 0) {
      return 'opacity-0'
    } else if (order === 1) {
      return 'opacity-25'
    } else if (order === 2) {
      return 'opacity-50'
    } else if (order === 3) {
      return 'opacity-75'
    } else {
      return 'opacity-100'
    }
  }
  return (
    <>
      <Title>오늘의 기분 농도를 선택하세요.</Title>
      <div className="flex items-center gap-2">
        <Text>Bad</Text>
        <List className="flex gap-2">
          {EMOTION_STATUS.map((emotion, i) => (
            <List.Row
              key={emotion.percent}
              className="relative flex size-10 flex-col items-center gap-2 rounded-md md:size-12"
            >
              {selectedStatus.percent === emotion.percent && (
                <Icon size={20} view={20} className="text-white">
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  ></path>
                </Icon>
              )}
              <Box className="size-full overflow-hidden rounded-md border">
                <EmotionBlock
                  onClick={() => onStatusClick(emotion)}
                  className={cn(
                    'opacity-0',
                    color === 'blue' &&
                      'bg-var-blue ring-var-blue dark:bg-var-blue',
                    color === 'yellow' &&
                      'bg-var-yellow ring-var-yellow dark:bg-var-yellow',
                    color === 'green' &&
                      'bg-var-green ring-var-green dark:bg-var-green',
                    color === 'orange' &&
                      'bg-var-orange ring-var-orange dark:bg-var-orange',
                    color === 'black' &&
                      'bg-var-black dark:text-var-dark ring-var-black dark:bg-white dark:ring-white',
                    colorizeOpacity(i),
                  )}
                />
              </Box>
              <Text size="sm" className="absolute top-[calc(100%--4px)]">
                {emotion.percent}
              </Text>
            </List.Row>
          ))}
        </List>
        <Text>Good</Text>
      </div>
    </>
  )
}
