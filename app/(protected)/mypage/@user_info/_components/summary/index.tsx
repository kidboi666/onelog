'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { useTheme } from '@/store/useTheme'
import { meQuery } from '@/services/queries/auth/meQuery'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
// import { formatColor } from '@/utils/formatColor'
import { getSignUpDays } from '@/utils/formatDate'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { TColor } from '@/types/theme'

export default function Summary() {
  const { color } = useTheme()
  const { data } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, data?.userId),
  )
  const { data: sentence } = useSuspenseQuery(
    sentenceQuery.getAllMySentence(supabase, data?.userId),
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
    <div className="flex w-full justify-between">
      <div className="flex flex-col gap-2">
        <Text type="caption">시작한지</Text>
        <Title size="bigger" type="sub">
          {getSignUpDays(me?.created_at) === '오늘' ? (
            getSignUpDays(me?.created_at)
          ) : (
            <>
              {getSignUpDays(me?.created_at)}
              <Text as="span">일 째</Text>
            </>
          )}
        </Title>
      </div>
      <div className="flex flex-col gap-2">
        <Text type="caption">기록</Text>
        <Title size="bigger" type="sub" className={formatColor(color)}>
          {sentence?.length}
          <Text as="span">개</Text>
        </Title>
      </div>
      <div className="flex flex-col gap-2">
        <Text type="caption">평균 달성률</Text>
        <Title size="bigger" type="sub">
          미구현
        </Title>
      </div>
    </div>
  )
}
