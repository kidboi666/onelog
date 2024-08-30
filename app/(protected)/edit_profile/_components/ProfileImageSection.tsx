import Image from 'next/image'
import { ComponentProps } from 'react'

interface Props extends ComponentProps<'input'> {
  imagePreview: string
}

export default function ProfileImageSection({ onChange, imagePreview }: Props) {
  return (
    <>
      {imagePreview && (
        <div className="relative size-40">
          <Image src={imagePreview} fill alt="프로필 사진 미리보기" />
        </div>
      )}
      <input type="file" onChange={onChange} />
    </>
  )
}
