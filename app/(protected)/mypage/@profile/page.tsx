'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import Box from '@/components/shared/Box'
import Button from '@/components/shared/Button'
import Line from '@/components/shared/Line'
import LinkButton from '@/components/shared/LinkButton'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'

export default function ProfileSection() {
  const { data } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, data?.sub),
  )

  return (
    <>
      <Box className="pointer-events-none flex flex-col justify-center max-sm:justify-between">
        <Box className="relative overflow-hidden rounded-full border border-gray-200 max-sm:size-52 sm:size-40 xl:sticky xl:z-30 xl:-translate-y-20">
          {me?.avatar_url ? (
            <Image
              src={me?.avatar_url}
              alt="프로필 이미지"
              fill
              className="rounded-full border-4 border-gray-50"
            />
          ) : (
            <Box className="absolute size-full bg-gray-200" />
          )}
        </Box>
        <Box className="self-end xl:absolute xl:top-40">
          <Title className="text-4xl font-medium">
            <Text as="span" className="mr-2">
              By
            </Text>
            {me?.nickname}
          </Title>
        </Box>
      </Box>
      <Box className="relative">
        <Line className="opacity-50" />
        <Text
          as="span"
          type="caption"
          className="dark:bg-var-dark absolute -top-2 left-1/2 -translate-x-1/2 bg-gray-50 px-2 text-sm text-gray-400"
        >
          소 개
        </Text>
      </Box>
      <Box className="flex flex-col gap-8">
        <Text type="caption">
          {me?.about_me ? me.about_me : '자기 소개를 작성해주세요.'}
        </Text>
        <Box className="flex gap-4">
          <LinkButton
            href="/edit_profile"
            variant="secondary"
            className="flex-1"
          >
            프로필 수정
          </LinkButton>
          <LinkButton href="/post" className="flex-1">
            글쓰기
          </LinkButton>
        </Box>
      </Box>
      <Button className="w-full">루틴 계획하기</Button>
    </>
  )
}
