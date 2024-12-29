import { routes } from '@/src/routes'
import { Fragment } from 'react'

import cn from '@/src/lib/cn'

import useRouterPushWithTransition from '@/src/hooks/useRouterPushWithTransition'

import Button from '@/src/components/Button'
import Text from '@/src/components/Text'

import { PROFILE_NAVIGATE_MENUS } from '@/src/app/(playground)/profile/view/[userId]/_constants/navigate'

interface Props {
  segment: string | null
  menu: (typeof PROFILE_NAVIGATE_MENUS)[number]
  counts: { count: number | null; postType: 'journal' | 'article' }[]
  likedCount: number | null
  userId: string
}

export default function NavigationMenuButton({
  segment,
  menu,
  counts,
  likedCount,
  userId,
}: Props) {
  const [isLoading, pushProfileView] = useRouterPushWithTransition(
    routes.profile.view(userId, menu.path),
  )
  return (
    <Button
      variant="teritory"
      size="sm"
      onClick={pushProfileView}
      isLoading={isLoading}
      className={cn(
        'flex-1 rounded-md font-medium text-zinc-500',
        segment === menu.path && 'bg-zinc-100 dark:bg-var-dark',
      )}
    >
      {menu.name}
      {counts.map(
        (data: any) =>
          data.postType === menu.path && (
            <Fragment key={data.postType}>
              <Text type="caption" size="xs" className="ml-1">
                {data.count}
              </Text>
            </Fragment>
          ),
      )}
      {menu.path === 'liked' && (
        <Text type="caption" size="xs" className="ml-1">
          {likedCount}
        </Text>
      )}
    </Button>
  )
}
