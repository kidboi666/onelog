import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'

export default function Summary() {
  return (
    <div className="flex w-full justify-between px-20 py-12">
      <div className="flex flex-col gap-2">
        <Text type="caption">시작한지</Text>
        <Title size="bigger" type="sub">
          30<Text as="span">일</Text>
        </Title>
      </div>
      <div className="flex flex-col gap-2">
        <Text type="caption">기록</Text>
        <Title size="bigger" type="sub" className="text-blue-400">
          112<Text as="span">개</Text>
        </Title>
      </div>
      <div className="flex flex-col gap-2">
        <Text type="caption">평균 달성률</Text>
        <Title size="bigger" type="sub">
          93<Text as="span">%</Text>
        </Title>
      </div>
    </div>
  )
}
