import { ChangeEvent, useEffect, useState } from 'react'
import { IUpdateProfileFormStates, IUserInfo } from '@/src/types/auth'

export default function useProfileForm(initialValues: IUserInfo) {
  const [formState, setFormState] = useState<IUpdateProfileFormStates>({
    userName: initialValues?.userName ?? null,
    aboutMe: initialValues?.aboutMe ?? null,
    avatarUrl: initialValues?.avatarUrl ?? null,
    imageFile: null,
    prevAvatarUrl: initialValues?.avatarUrl ?? null,
    mbti: initialValues?.mbti ?? null,
  })

  const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, userName: e.target.value }))
  }
  const handleChangeAboutMe = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, aboutMe: e.target.value }))
  }
  const handleChangeAvatarUrl = (avatarUrl: string) => {
    setFormState((prev) => ({ ...prev, avatarUrl }))
  }
  const handleChangeImageFile = (imageFile: File | null) => {
    setFormState((prev) => ({ ...prev, imageFile }))
  }
  const handleChangePrevAvatarUrl = (prevAvatarUrl: string) => {
    setFormState((prev) => ({ ...prev, prevAvatarUrl }))
  }

  useEffect(() => {
    if (formState.prevAvatarUrl) {
      URL.revokeObjectURL(formState.prevAvatarUrl)
    }
  }, [formState.prevAvatarUrl])

  return {
    states: { ...formState },
    actions: {
      onChangeUserName: handleChangeUserName,
      onChangeAboutMe: handleChangeAboutMe,
      onChangeAvatarUrl: handleChangeAvatarUrl,
      onChangeImageFile: handleChangeImageFile,
      onChangePrevAvatarUrl: handleChangePrevAvatarUrl,
    },
    validation: {
      isFormUnChanged,
      isFormInvalid,
    },
  }
}
