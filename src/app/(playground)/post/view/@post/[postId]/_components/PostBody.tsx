'use client'

import Title from '@/src/components/shared/Title'
import { EditorContent } from '@tiptap/react'
import { XStack, YStack } from '@/src/components/shared/Stack'
import Tag from '@/src/components/shared/Tag'
import useBlockEditor from '@/src/hooks/useBlockEditor'
import { useSuspenseQuery } from '@tanstack/react-query'
import { postQuery } from '@/src/services/queries/post/post-query'
import { supabase } from '@/src/lib/supabase/client'

interface Props {
  postId: number
}

export default function PostBody({ postId }: Props) {
  const { data: post } = useSuspenseQuery(postQuery.getPost(supabase, postId))
  const { editor } = useBlockEditor({ content: post?.content })

  if (!editor) {
    return null
  }

  if (!post) {
    return null
  }

  return (
    <YStack gap={8} className="my-8">
      {post.title && (
        <Title size="lg" className="my-4">
          {post.title}
        </Title>
      )}
      <EditorContent editor={editor} />
      {post?.tags && post.tags.length >= 1 && (
        <XStack className="flex-wrap">
          {post?.tags?.map((tag, index) => <Tag key={index} tag={tag} />)}
        </XStack>
      )}
    </YStack>
  )
}
