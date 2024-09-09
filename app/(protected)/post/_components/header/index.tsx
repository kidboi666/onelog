import Box from '@/components/shared/Box'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import { Editor } from '@tiptap/react'

interface Props {
  editor: Editor
}

export default function Header({ editor }: Props) {
  return (
    <>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        size="sm"
        variant={
          editor.isActive('heading', { level: 1 }) ? 'primary' : 'secondary'
        }
      >
        H1
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        size="sm"
        variant={
          editor.isActive('heading', { level: 2 }) ? 'primary' : 'secondary'
        }
      >
        H2
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        size="sm"
        variant={
          editor.isActive('heading', { level: 3 }) ? 'primary' : 'secondary'
        }
      >
        H3
      </Button>
      <Box className="mx-2 border-r" />
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        size="sm"
        variant={editor.isActive('bold') ? 'primary' : 'secondary'}
      >
        B
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        size="sm"
        variant={editor.isActive('italic') ? 'primary' : 'secondary'}
      >
        I
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        size="sm"
        variant={editor.isActive('strike') ? 'primary' : 'secondary'}
      >
        <Icon size={14}>
          <path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"></path>
        </Icon>
      </Button>
      <Box className="mx-2 border-r" />
      <Button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        size="sm"
        variant={editor.isActive('codeBlock') ? 'primary' : 'secondary'}
      >
        {'<>'}
      </Button>
    </>
  )
}
