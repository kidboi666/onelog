'use client'

import { ChangeEvent, useRef, useState } from 'react'
import { useInput } from '@/hooks/useInput'
import Container from '@/components/shared/Container'
import TitleInput from './_components/input/TitleInput'
import { FileInput } from './_components/input/FileInput'
import Box from '@/components/shared/Box'
import { TagsInput } from '@/components/shared/TagsInput'
import useBlockEditor from '@/hooks/useBlockEditor'
import { EditorContent } from '@tiptap/react'

export default function PostPage() {
  const ref = useRef<HTMLDivElement>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [title, onChangeTitle] = useInput('')
  const [content, onChangeContent, setContent] = useInput<string>('hello world')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const { editor } = useBlockEditor({ setContent, content })

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
      setImageFile(file)
    }
  }

  return (
    <Container
      isBackground
      isRounded
      className="flex min-h-screen flex-col gap-4 p-4"
    >
      <Box row className="gap-4">
        <FileInput
          file={imageFile}
          onChangeFile={handleChangeFile}
          preview={imagePreview}
          setPreview={setImagePreview}
        />
      </Box>
      <TitleInput value={title} onChange={onChangeTitle} />

      <EditorContent editor={editor} />
      <TagsInput tags={tags} setTags={setTags} />
      {/* <Markdown text={content} className="bg-red bor size-20" /> */}
      {/* <Button disabled>포스팅하기</Button> */}
    </Container>
  )
}
