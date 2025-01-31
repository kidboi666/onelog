import {
  MAX_PROFILE_IMAGE_FILE_SIZE,
  TOAST_MESSAGE,
} from '@/src/constants/index'
import { ChangeEvent, ComponentProps, useEffect, useRef } from 'react'
import { useToast } from '@/src/store/hooks/useToast'
import {
  IUpdateProfileFormActions,
  IUpdateProfileFormStates,
} from '@/src/types/dtos/auth'
import { Toast } from '@/src/types/enums/index'
import Avatar from '@/src/components/Avatar'
import Button from '@/src/components/Button'
import Icon from '@/src/components/Icon'
import { XStack, YStack, ZStack } from '@/src/components/Stack'
import TextDisplay from '@/src/components/TextDisplay'
import Title from '@/src/components/Title'

interface Props extends ComponentProps<'input'> {
  imagePreview: string | null
  actions: IUpdateProfileFormActions
  states: IUpdateProfileFormStates
}

export default function ProfileImageSection({
  imagePreview,
  actions,
  states,
}: Props) {
  const { openToast } = useToast()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return null

    if (file.size > MAX_PROFILE_IMAGE_FILE_SIZE) {
      openToast({
        text: TOAST_MESSAGE.USER_INFO.UPLOAD_AVATAR.OVER_SIZE,
        type: Toast.ERROR,
      })
      return null
    }

    if (!file.type.startsWith('image/')) {
      openToast({
        text: TOAST_MESSAGE.USER_INFO.UPLOAD_AVATAR.WRONG_TYPE,
        type: Toast.ERROR,
      })
      return null
    }
    actions.onChangeImageFile(file)
    actions.onChangeAvatarPreview(URL.createObjectURL(file))
  }

  const handlePreviewClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  useEffect(() => {
    return () => {
      if (states.avatarPreview) {
        URL.revokeObjectURL(states.avatarPreview)
      }
    }
  }, [states.avatarPreview])

  return (
    <YStack gap={4}>
      <Title>프로필 사진</Title>
      <XStack className="items-end">
        <ZStack>
          <Avatar src={imagePreview} size="xl" ring shadow="sm" />
          <input
            ref={inputRef}
            type="file"
            onChange={handleChangeImage}
            accept="image/*"
            className="hidden"
          />
          <Button
            onClick={handlePreviewClick}
            className="absolute bottom-0 right-0 rounded-full"
          >
            <Icon view="0 -960 960 960">
              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
            </Icon>
          </Button>
        </ZStack>
        <TextDisplay type="caption">
          5MB 이하의 PNG,JPG,GIF 파일을 올려주세요.
        </TextDisplay>
      </XStack>
    </YStack>
  )
}
