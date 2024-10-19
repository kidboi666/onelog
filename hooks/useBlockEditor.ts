'use client'

import CharacterCount from '@tiptap/extension-character-count'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Placeholder from '@tiptap/extension-placeholder'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { all, createLowlight } from 'lowlight'
import { Dispatch, SetStateAction } from 'react'
import { Markdown } from 'tiptap-markdown'

interface Props {
  content?: string
  setContent?: Dispatch<SetStateAction<string>>
  editable?: boolean
  limit?: number
  placeholder?: string
}

export default function useBlockEditor({
  content,
  setContent,
  editable,
  limit,
  placeholder,
}: Props) {
  const lowlight = createLowlight(all)

  const editor = useEditor({
    immediatelyRender: false,
    autofocus: editable ? true : false,
    editable: editable ? true : false,
    content,
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Placeholder.configure({
        placeholder,
        showOnlyCurrent: false,
      }),
      Markdown,
      CharacterCount.configure({
        limit,
      }),
    ],
    onUpdate({ editor }) {
      setContent && setContent(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: `${editable ? 'min-h-40' : ''} w-full prose sm:prose-base lg:prose-lg xl:prose-2xl outline-none`,
      },
    },
  })

  return { editor }
}
