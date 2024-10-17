import Avatar from '@/components/shared/Avatar'
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
      href={`/profile/${userId}`}
      variant="list"
      size="icon"
      className="h-fit"
      innerClassName="flex items-center gap-2"
    >
      <Avatar src={avatarUrl} size="sm" shadow="sm" ring="xs" />
      <Text type="caption" size="md">
        {email}
      </Text>
    </LinkButton>
  )
}
