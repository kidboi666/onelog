'use client'

import Line from '@/components/shared/Line'
import LinkButton from '@/components/shared/LinkButton'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { createBrowserClient } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import Image from 'next/image'

export default function UserInfoSection() {
  const supabase = createBrowserClient()
  const { data } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, data?.sub),
  )

  return (
    <>
      <div className="flex justify-center">
        <div className="relative size-40 overflow-hidden rounded-full">
          {me?.avatar_url ? (
            <Image src={me?.avatar_url} alt="프로필 이미지" fill />
          ) : (
            <div className="absolute size-full bg-gray-200" />
          )}
        </div>
      </div>
      <div className="flex items-center justify-center py-8">
        <Title className="text-5xl font-medium">
          <Text as="span" className="mr-2">
            By
          </Text>
          {me?.nickname}
        </Title>
      </div>
      <Line />
      <div className="flex flex-col gap-4 pt-6">
        <Title type="sub">소 개</Title>
        <Text type="caption">
          {me?.about_me ? (
            me.about_me
          ) : (
            <Text type="caption">자기 소개를 작성해주세요.</Text>
          )}
        </Text>
        <div className="flex gap-4">
          <LinkButton href="/write" className="flex-1">
            글쓰기
          </LinkButton>
          <LinkButton
            href="/edit_profile"
            variant="secondary"
            className="flex-1"
          >
            프로필 수정
          </LinkButton>
        </div>
      </div>
    </>
  )
}
