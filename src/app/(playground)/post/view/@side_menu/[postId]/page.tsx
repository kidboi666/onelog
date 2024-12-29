import { Container } from '@/src/components/Container';
import Line from '@/src/components/Line'
import { YStack } from '@/src/components/Stack'



import PostCountInfo from '@/src/app/(playground)/post/view/@side_menu/[postId]/_components/PostCountInfo';
import SideActionBar from '@/src/app/(playground)/post/view/@side_menu/[postId]/_components/SideActionBar';





interface Props {
  params: { postId: string }
}

export default function SideMenuPage({ params }: Props) {
  const postId = Number(params.postId)

  return (
    <Container className="sticky left-4 top-8 hidden h-fit animate-fade-in-reverse rounded-md bg-white p-2 shadow-md max-lg:fixed sm:flex dark:bg-var-darkgray">
      <YStack as="nav" className="items-center">
        <PostCountInfo postId={postId} />
        <Line className="w-full" />
        <SideActionBar postId={postId} />
      </YStack>
    </Container>
  )
}
