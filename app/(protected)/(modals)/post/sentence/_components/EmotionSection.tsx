import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import EmotionBlock from './EmotionBlock'
import { EMOTION_STATUS } from '../_constants'
import { List } from '@/components/shared/List'
import Box from '@/components/shared/Box'
import Icon from '@/components/shared/Icon'
import Container from '@/components/shared/Container'

interface Props {
  selectedStatus: any
  onStatusClick: any
}

export default function EmotionSection({
  selectedStatus,
  onStatusClick,
}: Props) {
  return (
    <Container className="flex flex-col items-center gap-8">
      <Title type="sub" size="sm">
        오늘의 기분 농도를 선택하세요.
      </Title>
      <Container className="flex items-center gap-2">
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
              <Box className="size-full overflow-hidden rounded-md ring-1 ring-gray-400">
                <EmotionBlock
                  index={i}
                  onClick={() => onStatusClick(emotion)}
                />
              </Box>
              <Text size="sm" className="absolute top-[calc(100%--4px)]">
                {emotion.percent}
              </Text>
            </List.Row>
          ))}
        </List>
        <Text>Good</Text>
      </Container>
    </Container>
  )
}
