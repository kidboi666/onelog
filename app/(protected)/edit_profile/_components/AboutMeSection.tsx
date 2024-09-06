import { ChangeEvent } from 'react'
import NickNameSection from './NickNameSection'
import ProfileImageSection from './ProfileImageSection'
import Container from '@/components/shared/Container'

interface Props {
  onChangeImage: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeNickName: (e: ChangeEvent<HTMLInputElement>) => void
  nickname: string | null
  avatarUrl: string | null
}
export default function AboutMeSection({
  onChangeImage,
  onChangeNickName,
  nickname,
  avatarUrl,
}: Props) {
  return (
    <Container className="flex items-end justify-between">
      <NickNameSection value={nickname ?? ''} onChange={onChangeNickName} />
      <ProfileImageSection onChange={onChangeImage} imagePreview={avatarUrl} />
    </Container>
  )
}
