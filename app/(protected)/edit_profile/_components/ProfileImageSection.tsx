import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import Image from 'next/image'
import { ComponentProps, useRef } from 'react'

interface Props extends ComponentProps<'input'> {
  imagePreview: string | null
}

export default function ProfileImageSection({ onChange, imagePreview }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handlePreviewClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }
  return (
    <Container
      onClick={() => handlePreviewClick()}
      className="relative flex h-fit w-fit cursor-pointer flex-col"
    >
      {imagePreview && (
        <Box className="relative size-40 overflow-hidden rounded-full">
          <Image src={imagePreview} fill alt="프로필 사진 미리보기" />
        </Box>
      )}
      <input
        ref={inputRef}
        type="file"
        onChange={onChange}
        accept="image/*"
        className="hidden"
      />
    </Container>
  )
}
