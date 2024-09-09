'use client'

import Container from '@/components/shared/Container'
import useBlockEditor from '@/hooks/useBlockEditor'

import { EditorContent } from '@tiptap/react'
import Header from './_components/header'
import Box from '@/components/shared/Box'

export default function PostPage() {
  const { editor } = useBlockEditor()

  if (!editor) {
    return null
  }
  return (
    <Container isRounded isPage className="mx-4 flex flex-col gap-2 p-4">
      <Box className="flex flex-wrap gap-2">
        <Header editor={editor} />
      </Box>

      <EditorContent editor={editor} />
    </Container>
  )
}
