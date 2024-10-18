'use client'

import { MouseEvent } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { meQuery } from '@/services/queries/auth/meQuery'
import useFavoriteSentence from '@/services/mutates/sentence/useFavoriteSentence'
import useBlockEditor from '@/hooks/useBlockEditor'
import { useRouter } from 'next/navigation'
import Avatar from '@/components/shared/Avatar'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import Line from '@/components/shared/Line'
import { EditorContent } from '@tiptap/react'
import Tag from '@/components/shared/Tag'
import { List } from '@/components/shared/List'

interface Props {
  params: { sentenceId: string }
}

export default function SentencePage({ params }: Props) {
  const router = useRouter()
  const sentenceId = params.sentenceId
  const { data: sentence } = useSuspenseQuery(
    sentenceQuery.getSentence(supabase, sentenceId),
  )
  const { data } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, data!.userId),
  )
  const { editor } = useBlockEditor({ content: sentence?.content })
  const { mutate: favoriteSentence } = useFavoriteSentence()

  if (!editor) return null

  const handleFavoriteSentence = (
    e: MouseEvent,
    { sentenceId }: { sentenceId: number },
  ) => {
    e.stopPropagation()
    favoriteSentence({ userId: me.id || '', sentenceId })
  }

  const handleAvatarClick = () => {
    router.push(`/${sentence?.user_id}`)
  }

  return (
    <>
      <div className="flex flex-col gap-4 rounded-md bg-white p-4 dark:bg-var-darkgray">
        <div className="flex items-center gap-4">
          <Avatar src={sentence?.user_info.avatar_url} size="md" ring="xs" />
          <div className="flex flex-col self-end">
            <Title type="sub" size="sm">
              {sentence?.user_info.user_name}
            </Title>
            <Text type="caption">{sentence?.user_info.email}</Text>
          </div>
        </div>
        <Line />
        {sentence?.tags && sentence.tags.length >= 1 && (
          <List className="flex flex-wrap gap-2">
            {sentence?.tags?.map((tag, index) => <Tag key={index} tag={tag} />)}
          </List>
        )}
        <div>
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  )
}
