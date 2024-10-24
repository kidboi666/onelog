'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { useTheme } from '@/store/useTheme'
import { userQuery } from '@/services/queries/auth/userQuery'
import { TColor } from '@/types/theme'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { getSignUpDays } from '@/utils/formatDate'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'

export default function AuthHistory() {
  const pathname = usePathname()
  const [_, __, userId] = pathname.split('/')
  const { color } = useTheme()
  const { data: user } = useSuspenseQuery(
    userQuery.getUserInfo(supabase, userId),
  )
  const { data: sentenceLength } = useSuspenseQuery(
    sentenceQuery.getAllMySentenceCount(supabase, userId),
  )

  const formatColor = (color: TColor) => {
    switch (color) {
      case 'green':
        return 'text-var-green dark:text-var-green'
      case 'blue':
        return 'text-var-blue dark:text-var-blue'
      case 'yellow':
        return 'text-var-yellow dark:text-var-yellow'
      case 'orange':
        return 'text-var-orange dark:text-var-orange'
      case 'black':
        return 'text-var-black dark:text-white '
      default:
        'text-var-black dark:text-white'
        break
    }
  }

  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-2">
        <Text type="caption">시작한지</Text>
        <Title size="bigger" type="sub">
          {getSignUpDays(user?.created_at) === '오늘' ? (
            getSignUpDays(user?.created_at)
          ) : (
            <>
              {getSignUpDays(user?.created_at)}
              <Text as="span">일 째</Text>
            </>
          )}
        </Title>
      </div>
      <div className="flex flex-col gap-2">
        <Text type="caption">기록</Text>
        <Title size="bigger" type="sub" className={formatColor(color)}>
          {sentenceLength}
          <Text as="span">개</Text>
        </Title>
      </div>
    </div>
  )
}
