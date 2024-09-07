'use client'

import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function useBlockEditor() {
  const editor = useEditor({
    immediatelyRender: false,
    autofocus: true,
    extensions: [
      StarterKit.configure({
        history: false,
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
  })

  return { editor }
}
