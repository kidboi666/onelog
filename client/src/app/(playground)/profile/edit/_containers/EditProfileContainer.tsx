'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { ChangeEvent, FormEvent } from 'react'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { meQuery } from '@/src/services/queries/auth/me-query'
import Button from '@/src/components/Button'
import { YStack } from '@/src/components/Stack'
import useProfileForm from '@/src/app/(playground)/profile/edit/_hooks/useProfileForm'
import useProfileMutations from '@/src/app/(playground)/profile/edit/_hooks/useProfileMutations'
import AboutMeSection from '../_components/AboutMeSection'
import EmailSection from '../_components/EmailSection'
import ProfileImageSection from '../_components/ProfileImageSection'
import UserNameSection from '../_components/UserNameSection'

export default function EditProfileContainer() {
  const { data: session } = useSuspenseQuery(meQuery.getSession(supabase))
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, session?.id),
  )
  const { states, actions } = useProfileForm(me)
  const { updateProfile, uploadImage, deletePrevImage, isLoading } =
    useProfileMutations()

  if (!me) {
    return null
  }

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      actions.onChangeImageFile(file)
      actions.onChangePrevAvatarUrl(URL.createObjectURL(file))
    }
  }

  const handleProfileUpdateWithImage = () => {
    if (states.prevAvatarUrl) {
      deletePrevImage(states.prevAvatarUrl)
    }
    void uploadImage(
      { email: me.email, image: states.imageFile },
      {
        onSuccess: (data) => {
          updateProfile({
            aboutMe: states.aboutMe,
            avatarUrl: data,
            userName: states.userName,
          })
        },
      },
    )
  }

  const handleProfileUpdateWithoutImage = () => {
    updateProfile({
      aboutMe: states.aboutMe,
      userName: states.userName,
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (states.imageFile) {
      handleProfileUpdateWithImage()
    } else {
      handleProfileUpdateWithoutImage()
    }
  }

  const isFormUnChanged =
    states.userName === me?.userName &&
    states.aboutMe === me?.aboutMe &&
    states.avatarUrl === me?.avatarUrl
  const isFormInvalid =
    (states.userName?.length ?? 0) > 10 || (states.aboutMe?.length ?? 0) > 150

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-in rounded-md bg-white p-2 shadow-sm sm:p-8 dark:bg-var-darkgray"
    >
      <YStack gap={8}>
        <ProfileImageSection
          onChange={handleChangeImage}
          imagePreview={states.avatarUrl}
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
