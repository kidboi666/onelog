'use client'

import AccessTypeButtonWithDropDown from '@/src/app/(playground)/(home)/_components/AccessTypeButtonWithDropDown'
import ShareButton from '@/src/app/(playground)/(home)/_components/ShareButton'
import ReportButton from '@/src/app/(playground)/(home)/_components/ReportButton'
import OptionButtonWithDropDown from '@/src/app/(playground)/(home)/_components/OptionButtonWithDropDown'
import { useSuspenseQuery } from '@tanstack/react-query'
import { postQuery } from '@/src/services/queries/post/post-query'
import { supabase } from '@/src/lib/supabase/client'

interface Props {
  postId: number
}

export default function SideActionBar({ postId }: Props) {
  const { data: post } = useSuspenseQuery(postQuery.getPost(supabase, postId))

  return (
    <>
      <AccessTypeButtonWithDropDown
        accessType={post.access_type}
        viewToolTip
        isSide
      />
      <ShareButton isSide viewToolTip />
      <ReportButton postId={postId} viewToolTip isSide />
      <OptionButtonWithDropDown postId={postId} isSide />
    </>
  )
}
