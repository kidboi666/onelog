'use client'

import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import Avatar from '@/components/shared/Avatar'
import Text from '@/components/shared/Text'
import { colorTheme, ringTheme, useTheme } from '@/store/useTheme'
import cn from '@/lib/cn'

export default function PostSentenceContainer() {
  const router = useRouter()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { color } = useTheme()

  const handleSentenceClick = () => {
    router.push('/write/sentence')
  }

  return (
    <div onClick={handleSentenceClick} className="flex gap-2">
      <div className="flex w-full flex-col gap-4">
        <div className="flex gap-4">
          <Avatar
            src={me?.avatar_url}
            size="sm"
            shadow="sm"
            className="max-sm:hidden"
          />
          <div
            className={cn(
              colorTheme({ color }),
              'flex w-full min-w-0 animate-cta-fadein-out items-center rounded-md bg-white p-2 text-sm dark:bg-var-darkgray',
              ringTheme.color[color],
            )}
          >
            <Text type="caption" className="">
              오늘 당신의 생각을 한 줄로 기록하세요.
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}
