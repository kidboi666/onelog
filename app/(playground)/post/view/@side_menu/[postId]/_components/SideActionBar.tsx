'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useMe } from '@/src/store/hooks/useMe'
import { postQuery } from '@/src/services/queries/post/post-query'
import AccessTypeButtonWithDropDown from '@/src/app/(playground)/(home)/_components/AccessTypeButtonWithDropDown'
import OptionButtonWithDropDown from '@/src/app/(playground)/(home)/_components/OptionButtonWithDropDown'
import ReportButton from '@/src/app/(playground)/(home)/_components/ReportButton'
import ShareButton from '@/src/app/(playground)/(home)/_components/ShareButton'

interface Props {
  postId: number
}

export default function SideActionBar({ postId }: Props) {
  const { me } = useMe()
  const { data: post } = useSuspenseQuery(postQuery.getPost(postId, me?.id))

  if (!post) {
    return null
  }

  const { accessType } = post

  return (
    <>
      <AccessTypeButtonWithDropDown
        accessType={accessType}
        viewToolTip
        isSide
      />
      <ShareButton isSide viewToolTip />
      <ReportButton postId={postId} viewToolTip isSide />
      <OptionButtonWithDropDown type="post" postId={postId} isSide />
    </>
  )
}
