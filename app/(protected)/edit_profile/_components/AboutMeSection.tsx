import { ChangeEvent } from 'react'
import UserNameSection from './UserNameSection'
import ProfileImageSection from './ProfileImageSection'
import Container from '@/components/shared/Container'

interface Props {
  onChangeImage: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeUserName: (e: ChangeEvent<HTMLInputElement>) => void
  userName: string | null
  avatarUrl: string | null
}
export default function AboutMeSection({
  onChangeImage,
  onChangeUserName,
  userName,
  avatarUrl,
}: Props) {
  return (
    <Container className="flex w-full justify-between max-sm:flex-col max-sm:gap-12 sm:items-end">
      <UserNameSection value={userName ?? ''} onChange={onChangeUserName} />
      <ProfileImageSection onChange={onChangeImage} imagePreview={avatarUrl} />
    </Container>
  )
}
