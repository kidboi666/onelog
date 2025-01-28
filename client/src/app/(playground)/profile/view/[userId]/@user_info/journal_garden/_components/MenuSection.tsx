'use client'

import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query'
import { useSelectedLayoutSegment } from 'next/navigation'
import { Fragment } from 'react'
import cn from '@/src/lib/cn'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { postCountQuery } from '@/src/services/queries/post/post-count-query'
import NavigationMenuButton from '@/src/app/(playground)/profile/view/[userId]/@user_info/journal_garden/_components/NavigationMenuButton'
import { PROFILE_NAVIGATE_MENUS } from '../../../_constants/navigate'

interface Props {
  userId: string
}

export default function MenuSection({ userId }: Props) {
  const { data: counts } = useSuspenseQueries({
    queries: ['journal', 'article'].map((type: any) =>
      postCountQuery.countAllPost(supabase, userId, type),
    ),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      }
    },
  })
  const { data: likedCount } = useSuspenseQuery(
    postCountQuery.countLikedPost(supabase, userId),
  )
  const segment = useSelectedLayoutSegment()

  return PROFILE_NAVIGATE_MENUS.map((menu, idx) => {
    return (
      <Fragment key={menu.id}>
        <NavigationMenuButton
          segment={segment}
          menu={menu}
          counts={counts}
          likedCount={likedCount}
          userId={userId}
        />
        {PROFILE_NAVIGATE_MENUS.length === idx + 1 ? null : (
          <div
            className={cn(
              'my-auto h-3 border-r border-zinc-200 dark:border-zinc-600',
            )}
          />
        )}
      </Fragment>
    )
  })
}
