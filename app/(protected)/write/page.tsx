import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'

export default function WritePage() {
  return (
    <div className="flex flex-col items-center justify-between">
      <Title>2024.08.28(목)의 기록</Title>
      <Title>오늘의 기분 농도를 선택하세요.</Title>
      <div></div>

      <Title>오늘을 한 줄로 기억해보세요.</Title>
      <Input />
      <Button>저장</Button>
    </div>
  )
}
