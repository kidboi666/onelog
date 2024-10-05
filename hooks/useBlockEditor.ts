'use client'

import Placeholder from '@tiptap/extension-placeholder'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Dispatch, SetStateAction } from 'react'
import { Markdown } from 'tiptap-markdown'

interface Props {
  content: string
  setContent?: Dispatch<SetStateAction<string>>
  editable?: boolean
  placeholder?: string
}

export default function useBlockEditor({
  content,
  setContent,
  editable,
  placeholder,
}: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    autofocus: editable ? true : false,
    editable: editable ? true : false,
    content,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
        showOnlyCurrent: false,
      }),
      Markdown,
    ],
    onUpdate({ editor }) {
      setContent && setContent(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: `${editable ? 'min-h-40' : ''} size-full prose sm:prose-base lg:prose-lg xl:prose-2xl outline-none`,
      },
    },
  })

  return { editor }
}
