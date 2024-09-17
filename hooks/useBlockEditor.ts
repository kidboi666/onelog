'use client'

import Link from '@tiptap/extension-link'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Dispatch, SetStateAction } from 'react'
import { Markdown } from 'tiptap-markdown'

interface Props {
  content: string
  setContent: Dispatch<SetStateAction<string>>
}

export default function useBlockEditor({ content, setContent }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    autofocus: true,
    content: content,
    extensions: [
      StarterKit.configure({
        history: false,
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.extend({ inclusive: false }).configure({
        openOnClick: false,
      }),
      Markdown,
    ],
    onUpdate({ editor }) {
      setContent(editor.getHTML())
    },
    editorProps: {
      attributes: {
        spellcheck: 'false',
        class: 'w-full text-gray-600 dark:text-gray-200 m-5 outline-none',
      },
    },
  })

  return { editor }
}
