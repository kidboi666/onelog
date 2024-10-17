'use client'

import Button from '@/components/shared/Button'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function PasswordResetForm() {
  const router = useRouter()
  const { data } = useSuspenseQuery(meQuery.getUserSession(supabase))

  const handlePasswordReset = () => {
    router.push('/settings/confirm')
  }

  return (
    <div className="flex flex-col gap-2">
      <Title>비밀번호 변경</Title>
      <Text>
        이메일 :{' '}
        <Text as="span" className="text-gray-400">
          {data?.email}
        </Text>
      </Text>
      <Button onClick={handlePasswordReset} size="sm" className="w-fit">
        현재 이메일로 비밀번호 변경 이메일 보내기
      </Button>
    </div>
  )
}
