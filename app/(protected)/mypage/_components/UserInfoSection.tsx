'use client'

import Line from '@/components/shared/Line'
import LinkButton from '@/components/shared/LinkButton'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { createBrowserClient } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function UserInfoSection() {
  const supabase = createBrowserClient()
  const { data: me } = useSuspenseQuery(meQuery.getUserInfo(supabase))

  return (
    <>
      <div className="flex items-center justify-center p-12">
        <Title className="text-5xl font-medium">
          <Text as="span" className="mr-2">
            By
          </Text>
          {me?.nickname}
        </Title>
      </div>
      <Line />
      <div className="flex flex-col gap-4 pt-6">
        <Title type="sub">소개</Title>
        <Text type="caption">
          IT사 엔터콘텐츠 기획자 겸 마케터. 삶에 영감을 주는 모든 콘텐츠를
          덕질하고 리뷰합니다. 콘텐츠업계에서 배우는 브랜딩과 프로듀싱에 관해
          이야기합니다.
        </Text>
        <div className="flex gap-4">
          <LinkButton href="/write" className="w-fit">
            글쓰기
          </LinkButton>
          <LinkButton
            href="/edit_profile"
            variant="secondary"
            className="w-fit"
          >
            프로필 수정
          </LinkButton>
        </div>
      </div>
    </>
  )
}
