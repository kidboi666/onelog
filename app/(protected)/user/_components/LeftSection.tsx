import Button from '@/components/shared/Button'
import Line from '@/components/shared/Line'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'

export default function LeftSection() {
  return (
    <>
      <div className="flex items-center justify-center p-12">
        <Title className="text-5xl font-medium">
          <Text as="span" className="mr-2">
            By
          </Text>
          슥슥
        </Title>
      </div>
      <Line />
      <div className="flex flex-col gap-4 pt-6">
        <Title type="sub">소개</Title>
        <Text type="caption">
          IT사 엔터콘텐츠 기획자 겸 마케터. 삶에 영감을 주는 모든 콘텐츠를 덕질하고 리뷰합니다.
          콘텐츠업계에서 배우는 브랜딩과 프로듀싱에 관해 이야기합니다.
        </Text>
        <Button className="w-fit">글쓰기</Button>
      </div>
    </>
  )
}
