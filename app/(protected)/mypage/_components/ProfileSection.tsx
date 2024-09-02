'use client'

import Button from '@/components/shared/Button'
import Line from '@/components/shared/Line'
import LinkButton from '@/components/shared/LinkButton'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { createBrowserClient } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import Image from 'next/image'

export default function ProfileSection() {
  const supabase = createBrowserClient()
  const { data } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, data?.sub),
  )

  return (
    <>
      <div className="pointer-events-none flex justify-center max-sm:flex-col max-sm:justify-between sm:sticky sm:z-30 sm:-translate-y-20">
        <div className="relative overflow-hidden rounded-full border border-gray-200 max-sm:size-52 sm:size-40">
          {me?.avatar_url ? (
            <Image
              src={me?.avatar_url}
              alt="프로필 이미지"
              fill
              className="rounded-full border-4 border-gray-50"
            />
          ) : (
            <div className="absolute size-full bg-gray-200" />
          )}
        </div>
        <div className="self-end max-xl:mt-8 sm:absolute sm:top-40 xl:top-48">
          <Title className="text-4xl font-medium">
            <Text as="span" className="mr-2">
              By
            </Text>
            {me?.nickname}
          </Title>
        </div>
      </div>
      <div className="relative">
        <Line />
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gray-50 px-2 text-sm text-gray-400">
          소 개
        </span>
      </div>
      <div className="flex flex-col gap-8">
        <Text type="caption">
          {me?.about_me ? me.about_me : '자기 소개를 작성해주세요.'}
        </Text>
        <div className="flex gap-4">
          <LinkButton
            href="/edit_profile"
            variant="secondary"
            className="flex-1"
          >
            프로필 수정
          </LinkButton>
          <LinkButton href="/write" className="flex-1">
            글쓰기
          </LinkButton>
        </div>
      </div>
      <Button className="w-full">루틴 계획하기</Button>
    </>
  )
}
