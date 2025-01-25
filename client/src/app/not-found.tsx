import { ROUTES } from '@/src/routes'
import BackButton from '@/src/components/BackButton'
import LinkButton from '@/src/components/LinkButton'
import { XStack, YStack } from '@/src/components/Stack'
import TextDisplay from '@/src/components/TextDisplay'
import Title from '@/src/components/Title'

export default function NotFound() {
  return (
    <div className="flex h-dvh flex-1 items-center justify-center">
      <YStack gap={12} className="items-center">
        <XStack className="items-end">
          <Title size="bigger">404</Title>
          <Title>Page</Title>
        </XStack>
        <YStack className="justify-center">
          <TextDisplay>이 페이지는 존재하지 않습니다. </TextDisplay>
          <TextDisplay>처음으로 돌아가세요. </TextDisplay>
        </YStack>
        <XStack>
          <BackButton variant="secondary" size="md" className="p-3">
            뒤로가기
          </BackButton>
          <LinkButton href={ROUTES.HOME}>메인 화면으로</LinkButton>
        </XStack>
      </YStack>
    </div>
  )
}
