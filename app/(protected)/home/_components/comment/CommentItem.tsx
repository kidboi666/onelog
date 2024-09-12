import Avatar from '@/components/feature/user/Avatar'
import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'

interface Props {
  대댓글?: boolean
}

export default function CommentItem({ 대댓글 }: Props) {
  return (
    <Container className="flex w-full gap-2">
      <Avatar size="sm" />
      <Box col className="gap-2">
        <Box>
          <Title size="xs" type="sub">
            김첨지
            <Text as="span" type="caption" size="sm">
              {' '}
              님의 댓글
            </Text>
          </Title>
          <Text type="caption" size="sm">
            24.09.12
          </Text>
        </Box>
        <Box isBackground isRounded className="w-fit p-4">
          <Text>
            안녕하세요 글
            잘봤습니다.dsdfasdfㅁㄴㄴㅇㄹㅁㄹㅇㅎㄴㅇㄹㅎㄴㅇㄹㅎㄴㅇㄹㅎㄴㅁㅇㄹㅎㄴㅁㅇㄹㅁㄴㅇㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹasㄹㅎㄴㅇㄹㅎㄴㅇㄹㅎㄴㅇㄹㅎ
            ㅁㄴㅇㄹㅁㄴㅇㄹdf
          </Text>
        </Box>
        {대댓글 ? <CommentItem /> : null}
      </Box>
    </Container>
  )
}
