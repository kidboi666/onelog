import Avatar from '@/components/feature/user/Avatar'
import LinkButton from '@/components/shared/LinkButton'
import Text from '@/components/shared/Text'

interface Props {
  userId?: string
  avatarUrl?: string | null
  email?: string
}

export default function AvatarSection({ userId, avatarUrl, email }: Props) {
  return (
    <LinkButton
      href={`/${userId}`}
      variant="list"
      size="icon"
      className="h-fit"
      innerClassName="flex items-center gap-2"
    >
      <Avatar src={avatarUrl} size="sm" shadow="sm" ring="xs" />
      <Text>{email}</Text>
    </LinkButton>
  )
}
