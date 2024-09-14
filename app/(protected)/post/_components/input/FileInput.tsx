import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react'
import Image from 'next/image'
import Icon from '@/components/shared/Icon'
import Button from '@/components/shared/Button'
import Text from '@/components/shared/Text'

interface Props {
  preview: string
  setPreview: Dispatch<SetStateAction<string>>
  onChangeFile: (e: ChangeEvent<HTMLInputElement>) => void
  file: File | null
}

export const FileInput = ({
  preview,
  setPreview,
  onChangeFile,
  file,
}: Props) => {
  const [showCancelButton, setShowCancelButton] = useState(false)
  const imageInput = useRef<HTMLInputElement>(null)

  const handlePickClick = () => {
    if (imageInput.current) {
      imageInput.current.click()
    }
  }

  return (
    <Button
      variant="secondary"
      onMouseEnter={() => setShowCancelButton(true)}
      onMouseLeave={() => setShowCancelButton(false)}
      onClick={handlePickClick}
      className="relative h-20 w-full rounded-md border-gray-300 text-gray-300"
    >
      {preview && showCancelButton && (
        <Button
          variant="icon"
          onClick={() => setPreview('')}
          className="absolute inset-0 z-10 flex items-center justify-center gap-4 rounded-lg text-white opacity-90"
        >
          <Icon size={24} view={24}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </Icon>
        </Button>
      )}
      {preview ? (
        <Image
          src={preview}
          alt="커버 이미지 미리보기"
          fill
          className="rounded-lg object-cover"
        />
      ) : (
        <Icon>
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
            clipRule="evenodd"
          />
        </Icon>
      )}
      <input
        name="image"
        onChange={onChangeFile}
        type="file"
        accept="image/*"
        className="hidden"
        ref={imageInput}
      />
      <Text
        type="caption"
        className="group-hover:text-white dark:group-hover:text-slate-500"
      >
        {preview ? file?.name : '커버 이미지 파일 선택'}
      </Text>
    </Button>
  )
}
