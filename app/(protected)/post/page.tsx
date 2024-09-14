'use client'

import { ChangeEvent, useState } from 'react'
import { useInput } from '@/hooks/useInput'
import Container from '@/components/shared/Container'
import TitleInput from './_components/input/TitleInput'
import { FileInput } from './_components/input/FileInput'
import Box from '@/components/shared/Box'
import Markdown from '@/components/shared/Markdown'
import TextArea from '@/components/shared/TextArea'

export default function PostPage() {
  const [imagePreview, setImagePreview] = useState('')
  const [title, onChangeTitle] = useInput('')
  const [content, onChangeContent] = useInput('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [tags, setTags] = useState<string[]>([])

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
      <TextArea value={content} onChange={onChangeContent} />
      <div contentEditable />
      <Markdown text={content} />
      {/* <TagsInput tags={tags} setTags={setTags} /> */}
      {/* <Button disabled>포스팅하기</Button> */}
    </Container>
  )
}
