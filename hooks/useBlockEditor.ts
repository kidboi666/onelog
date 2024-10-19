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

const lowlight = createLowlight(all)

export default function useBlockEditor({
  content,
  setContent,
  editable,
  limit,
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
      CodeBlockLowlight.configure({
        lowlight,
      }),
      CharacterCount.configure({
        limit,
      }),
    ],
    onUpdate({ editor }) {
      setContent && setContent(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: `${editable ? 'min-h-40' : ''} w-full outline-none`,
      },
    },
  })

  return { editor }
}
