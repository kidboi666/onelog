import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import EmotionBlock from './EmotionBlock'
import { EMOTION_STATUS } from '../_constants'
import { List } from '@/components/shared/List'

interface Props {
  selectedStatus: any
  onStatusClick: any
}

export default function EmotionSection({
  selectedStatus,
  onStatusClick,
}: Props) {
  return (
    <>
      <Title>오늘의 기분 농도를 선택하세요.</Title>
      <div className="flex items-center gap-2">
        <Text>Bad</Text>
        <List className="flex gap-2">
          {EMOTION_STATUS.map((emotion) => (
            <List.Row
              key={emotion.percent}
              className="relative flex flex-col items-center gap-2"
            >
              <EmotionBlock
                state={emotion}
                currentState={selectedStatus}
                onClick={() => onStatusClick(emotion)}
                className={emotion.color}
              />
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
