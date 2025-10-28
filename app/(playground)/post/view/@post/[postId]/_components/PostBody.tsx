'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { EditorContent } from '@tiptap/react'
import { useMe } from '@/src/store/hooks/useMe'
import { postQuery } from '@/src/services/queries/post/post-query'
import useBlockEditor from '@/src/hooks/useBlockEditor'
import { XStack, YStack } from '@/src/components/Stack'
import Tag from '@/src/components/Tag'
import Title from '@/src/components/Title'

interface Props {
  postId: number
}

export default function PostBody({ postId }: Props) {
  const { me } = useMe()
  const { data: post } = useSuspenseQuery(postQuery.getPost(postId, me?.id))
  const { editor } = useBlockEditor({ content: post?.content })

  if (!post || !editor) return null

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
