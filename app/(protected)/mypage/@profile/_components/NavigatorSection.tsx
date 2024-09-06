import Box from '@/components/shared/Box'
import Button from '@/components/shared/Button'
import LinkButton from '@/components/shared/LinkButton'
import Text from '@/components/shared/Text'

interface Props {
  aboutMe: string | null
}

export default function NavigatorSection({ aboutMe }: Props) {
  return (
    <>
      <Box className="flex flex-col gap-8">
        <Text type="caption">
          {aboutMe ? aboutMe : '자기 소개를 작성해주세요.'}
        </Text>
        <Box className="flex gap-4">
          <LinkButton
            href="/edit_profile"
            variant="secondary"
            className="flex-1"
          >
            프로필 수정
          </LinkButton>
          <LinkButton href="/post" className="flex-1">
            글쓰기
          </LinkButton>
        </Box>
      </Box>
      <Button className="w-full">루틴 계획하기</Button>
    </>
  )
}
