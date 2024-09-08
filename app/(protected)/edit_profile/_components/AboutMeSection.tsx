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
    <Container className="flex items-end justify-between">
      <UserNameSection value={userName ?? ''} onChange={onChangeUserName} />
      <ProfileImageSection onChange={onChangeImage} imagePreview={avatarUrl} />
    </Container>
  )
}
