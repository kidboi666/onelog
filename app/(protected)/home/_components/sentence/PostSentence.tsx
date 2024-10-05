'use client'

import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { EMOTION_STATUS } from '@/app/(protected)/(modals)/post/sentence/_constants'
import Input from '@/components/shared/Input'
import { List } from '@/components/shared/List'
import Avatar from '@/components/feature/user/Avatar'
import EmotionPicker from '@/components/feature/sentence/EmotionPicker'

export default function PostSentence() {
  const router = useRouter()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))

  const handleSentenceClick = () => {
    router.push('/post/sentence')
  }
  return (
    <div onClick={handleSentenceClick} className="flex gap-2">
      <div className="flex w-full flex-col gap-4">
        <div className="flex gap-4">
          <Avatar
            src={me?.avatar_url}
            size="sm"
            shadow="sm"
            className="max-sm:hidden"
          />
          <Input
            variant="primary"
            placeholder="오늘 당신의 생각을 한 줄로 기록하세요."
            className="w-full min-w-0 animate-cta-fadein-out p-2 text-sm"
          />
        </div>
        <List className="relative flex items-start justify-between gap-2">
          <div className="absolute left-1/2 top-[7.5px] w-[calc(100%-30px)] -translate-x-1/2 border-b border-zinc-200 dark:border-zinc-600" />
          {EMOTION_STATUS.map((emotion) => (
            <EmotionPicker key={emotion.status} emotion={emotion} />
          ))}
        </List>
      </div>
    </div>
  )
}
