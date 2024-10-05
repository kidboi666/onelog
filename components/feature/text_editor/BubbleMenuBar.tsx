import { Editor } from '@tiptap/react'
import { Fragment } from 'react'
import MenuItem from './MenuItem'

interface Props {
  editor: Editor
}

export default function BubbleMenuBar({ editor }: Props) {
  if (!editor) return null

  const items = [
    {
      icon: (
        <path d="M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H272Zm121-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z" />
      ),
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: (
        <path d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z" />
      ),
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: (
        <path d="M80-400v-80h800v80H80Zm340-160v-120H200v-120h560v120H540v120H420Zm0 400v-160h120v160H420Z" />
      ),
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      icon: (
        <path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z" />
      ),
      title: 'Code',
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive('code'),
    },
  ]

  return (
    <div className="flex w-fit gap-1 rounded-md bg-white p-1 shadow-lg ring-1 ring-zinc-200 dark:bg-var-darkgray dark:ring-zinc-600">
      {items.map((item, idx) => (
        <Fragment key={idx}>
          <MenuItem {...item} />
        </Fragment>
      ))}
    </div>
  )
}
