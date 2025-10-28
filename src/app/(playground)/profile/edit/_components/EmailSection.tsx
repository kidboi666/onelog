import Input from '@/src/components/Input'
import { YStack } from '@/src/components/Stack'
import TextDisplay from '@/src/components/TextDisplay'
import Title from '@/src/components/Title'

interface Props {
  email?: string
  provider?: string
}

export default function EmailSection({ email, provider }: Props) {
  return (
    <YStack gap={4}>
      <Title>이메일</Title>
      <YStack>
        <Input
          disabled
          variant="auth"
          value={email}
          className="text-zinc-400 dark:text-zinc-500"
        />
        <TextDisplay type="caption">
          {provider === 'kakao'
            ? '카카오로 가입한 유저 입니다.'
            : '이메일로 가입한 유저 입니다.'}
        </TextDisplay>
      </YStack>
    </YStack>
  )
}
