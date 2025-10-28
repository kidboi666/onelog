import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import {
  IUpdateProfileFormActions,
  IUpdateProfileFormStates,
} from '@/src/types/dtos/auth'
import { IUserInfo } from '@/src/types/entities/auth'
import { TMBTI } from '@/src/app/(playground)/profile/edit/_constants/mbti'

export default function useProfileForm(initialValues?: IUserInfo | null): {
  states: IUpdateProfileFormStates
  actions: IUpdateProfileFormActions
} {
  const [formState, setFormState] = useState<IUpdateProfileFormStates>({
    userName: initialValues?.userName ?? null,
    aboutMe: initialValues?.aboutMe ?? null,
    avatarPreview: initialValues?.avatarUrl ?? null,
    imageFile: null,
    currentAvatarUrl: initialValues?.avatarUrl ?? null,
    mbti: initialValues?.mbti ?? null,
  })

  const handleChangeUserName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, userName: e.target.value }))
    },
    [setFormState],
  )
  const handleChangeAboutMe = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setFormState((prev) => ({ ...prev, aboutMe: e.target.value }))
    },
    [setFormState],
  )
  const handleChangeAvatarPreview = useCallback(
    (avatarUrl: string) => {
      setFormState((prev) => ({ ...prev, avatarPreview: avatarUrl }))
    },
    [setFormState],
  )
  const handleChangeImageFile = useCallback(
    (imageFile: File | null) => {
      setFormState((prev) => ({ ...prev, imageFile }))
    },
    [setFormState],
  )
  const handleChangeCurrentAvatarUrl = useCallback(
    (avatarUrl: string) => {
      setFormState((prev) => ({ ...prev, currentAvatarUrl: avatarUrl }))
    },
    [setFormState],
  )
  const handleChangeMbti = useCallback(
    (mbti: TMBTI) => {
      setFormState((prev) => ({ ...prev, mbti }))
    },
    [setFormState],
  )

  useEffect(() => {
    if (initialValues) {
      setFormState({
        userName: initialValues?.userName ?? null,
        aboutMe: initialValues?.aboutMe ?? null,
        avatarPreview: initialValues?.avatarUrl ?? null,
        imageFile: null,
        currentAvatarUrl: initialValues?.avatarUrl ?? null,
        mbti: initialValues?.mbti ?? null,
      })
    }
  }, [initialValues])

  return {
    states: { ...formState },
    actions: {
      onChangeUserName: handleChangeUserName,
      onChangeAboutMe: handleChangeAboutMe,
      onChangeAvatarPreview: handleChangeAvatarPreview,
      onChangeImageFile: handleChangeImageFile,
      onChangeCurrentAvatarUrl: handleChangeCurrentAvatarUrl,
      onChangeMbti: handleChangeMbti,
    },
  }
}
