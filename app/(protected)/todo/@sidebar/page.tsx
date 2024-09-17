import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'

export default function SideBar() {
  return (
    <Container
      isBackground
      className="mt-12 flex h-fit flex-col gap-8 rounded-md p-4 shadow-md max-lg:mx-4 lg:p-8"
    >
      <Box>- 전체</Box>
      <Box>할일</Box>
    </Container>
  )
}
