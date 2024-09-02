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
    <div
      onClick={() => handlePreviewClick()}
      className="relative flex h-fit cursor-pointer flex-col"
    >
      {imagePreview && (
        <div className="relative size-40 overflow-hidden rounded-full">
          <Image src={imagePreview} fill alt="프로필 사진 미리보기" />
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        onChange={onChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  )
}
