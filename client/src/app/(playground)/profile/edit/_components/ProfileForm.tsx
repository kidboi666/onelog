import {
  UseMutateAsyncFunction,
  UseMutateFunction,
} from '@tanstack/react-query'
import { FormEvent } from 'react'
import {
  IUpdateProfileFormActions,
  IUpdateProfileFormStates,
  IUpdateUserInfo,
} from '@/src/types/dtos/auth'
import { IUploadAvatar, IUserInfo } from '@/src/types/entities/auth'
import Button from '@/src/components/Button'
import { YStack } from '@/src/components/Stack'
import AboutMeSection from '@/src/app/(playground)/profile/edit/_components/AboutMeSection'
import EmailSection from '@/src/app/(playground)/profile/edit/_components/EmailSection'
import ProfileImageSection from '@/src/app/(playground)/profile/edit/_components/ProfileImageSection'
import UserNameSection from '@/src/app/(playground)/profile/edit/_components/UserNameSection'
import useProfileFormValidation from '@/src/app/(playground)/profile/edit/_hooks/useProfileFormValidation'

interface Props {
  me: IUserInfo
  states: IUpdateProfileFormStates
  actions: IUpdateProfileFormActions
  isLoading: boolean
  updateProfile: UseMutateFunction<void, Error, IUpdateUserInfo, unknown>
  uploadImage: UseMutateAsyncFunction<string, Error, IUploadAvatar, unknown>
  deletePrevImage: UseMutateFunction<void, Error, string, unknown>
}

export default function ProfileForm({
  me,
  states,
  actions,
  isLoading,
  updateProfile,
  uploadImage,
  deletePrevImage,
}: Props) {
  const { isFormUnChanged, isFormInvalid } = useProfileFormValidation(
    states,
    me,
  )

  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault()
    const baseProfileData = {
      aboutMe: states.aboutMe,
      userName: states.userName,
    }
    if (states.imageFile) {
      const avatarUrl = await uploadImage({
        email: me.email,
        image: states.imageFile,
      })

      if (states.currentAvatarUrl) {
        deletePrevImage(states.currentAvatarUrl)
      }

      updateProfile({ ...baseProfileData, avatarUrl })
    } else {
      updateProfile({ ...baseProfileData })
    }
  }

  return (
    <form
      onSubmit={handleProfileUpdate}
      className="animate-fade-in rounded-md bg-white p-2 shadow-sm sm:p-8 dark:bg-var-darkgray"
    >
      <YStack gap={8}>
        <ProfileImageSection
          actions={actions}
          states={states}
          imagePreview={states.avatarPreview ?? states.currentAvatarUrl}
        />
        <EmailSection email={me.email} provider={me.provider} />
        <UserNameSection
          value={states.userName ?? ''}
          onChange={actions.onChangeUserName}
        />
        <AboutMeSection
          value={states.aboutMe ?? ''}
          onChange={actions.onChangeAboutMe}
        />
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isFormUnChanged || isFormInvalid}
        >
          수정하기
        </Button>
      </YStack>
    </form>
  )
}
