'use client'

import Button from '@/components/shared/Button'
import Spinner from '@/components/shared/Spinner'
import Text from '@/components/shared/Text'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export default function NavigatorSection() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const [isLoadingProfile, startTransitionProfile] = useTransition()
  const [isLoadingWrite, startTransitionWrite] = useTransition()
  const router = useRouter()

  if (!me) return null

  return (
    <>
      <div className="flex flex-col gap-8">
        <Text type="caption">
          {me.about_me ? me.about_me : '자기 소개를 작성해주세요.'}
        </Text>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Button
              variant="secondary"
              onClick={() =>
                startTransitionProfile(() => router.push('/edit_profile'))
              }
              className="flex-1 text-nowrap"
            >
              {isLoadingProfile ? <Spinner size={20} /> : '프로필 수정'}
            </Button>
            <Button
              onClick={() => startTransitionWrite(() => router.push('/post'))}
              className="flex-1"
            >
              {isLoadingWrite ? <Spinner size={20} /> : '글쓰기'}
            </Button>
          </div>
          <Button className="w-full">루틴 계획하기</Button>
        </div>
      </div>
    </>
  )
}
