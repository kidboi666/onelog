'use client'

import LinkButton from '@/components/shared/LinkButton'
import Title from '@/components/shared/Title'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthCtaSection() {
  const router = useRouter()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))

  useEffect(() => {
    if (me) {
      router.replace('/home')
    }
  }, [me])

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-96 flex-col gap-12 p-4">
        <div className="flex flex-col gap-4">
          <Title>지금 가입하세요.</Title>
          <Title>당신의 글쓰기 루틴을 만드세요.</Title>
        </div>
        <div className="flex flex-col gap-4">
          <LinkButton href="/home">구경하러 가기</LinkButton>
          <Title size="sm">함께하세요.</Title>
          <LinkButton href="/signup" variant="secondary">
            가입하러 가기
          </LinkButton>
        </div>
      </div>
    </div>
  )
}
