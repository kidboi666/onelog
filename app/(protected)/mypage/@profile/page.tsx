'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import Container from '@/components/shared/Container'
import AboutMeSection from './_components/AboutMeSection'
import NavigatorSection from './_components/NavigatorSection'

export default function ProfileSection() {
  const { data } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, data?.sub),
  )

  return (
    <Container
      isRounded
      className="mt-12 flex h-fit flex-col gap-8 bg-transparent px-4 py-8 max-lg:mx-4 xl:px-8 dark:bg-transparent"
    >
      <AboutMeSection avatarUrl={me?.avatar_url} nickname={me?.nickname} />
      <NavigatorSection aboutMe={me?.about_me} />
    </Container>
  )
}
