'use client'

import Button from '@/components/shared/Button'
import Container from '@/components/shared/Container'
import useBlockEditor from '@/hooks/useBlockEditor'

import { EditorContent } from '@tiptap/react'

export default function PostPage() {
  const { editor } = useBlockEditor()

  if (!editor) {
    return null
  }
  return (
    <Container isRounded isPage className="p-4">
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          &lsquo;&lsquo; &rsquo;&rsquo;
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </Button>
      </div>

      <EditorContent editor={editor} />
      <h1 className="prose-heading:m-2 prose">dasdfasdf</h1>
    </Container>
  )
}
