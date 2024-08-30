'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createBrowserClient } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import NickNameSection from './_components/NickNameSection'
import IntroduceSection from './_components/IntroduceSection'
import ChallangeSection from './_components/ChallangeSection'
import ProfileImageSection from './_components/ProfileImageSection'
import { useInput } from '@/hooks/useInput'

export default function EditProfilePage() {
  const supabase = createBrowserClient()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data } = useSuspenseQuery(meQuery.getUserInfo(supabase, me?.sub))
  const [nickname, onChangeNickName, setNickname] = useInput('')
  const [aboutMe, onChangeAboutMe, setAboutMe] = useInput('')
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState('')

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.[0]) {
      setProfileImage(e.target.files[0])
      const nextPreview = URL.createObjectURL(e.target.files[0])
      setImageUrl(nextPreview)
    }
  }
  console.log(data)
  useEffect(() => {
    setNickname(data[0].nickname)
    setAboutMe(data[0].about_me)
  }, [data.avatar_url, data.nickname, data.about_me])

  return (
    <div className="flex flex-col gap-4">
      <ProfileImageSection
        onChange={handleImageChange}
        imagePreview={imageUrl}
      />
      <div className="flex w-56 flex-col gap-2">
        <NickNameSection value={nickname} onChange={onChangeNickName} />
      </div>
      <div className="flex w-full flex-col gap-2">
        <IntroduceSection value={aboutMe} onChange={onChangeAboutMe} />
      </div>
      <ChallangeSection />
    </div>
  )
}
