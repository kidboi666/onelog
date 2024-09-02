import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { EMOTION_STATUS } from '../_constants'
import EmotionBlock from './EmotionBlock'

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
        {EMOTION_STATUS.map((emotion) => (
          <div
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
          </div>
        ))}
        <Text>Good</Text>
      </div>
    </>
  )
}
