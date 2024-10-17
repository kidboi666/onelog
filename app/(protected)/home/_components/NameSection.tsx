import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'

interface Props {
  userName: string | null
  email: string | null
}

export default function NameSection({ userName, email }: Props) {
  return (
    <div className="flex h-full w-full flex-col">
      <Title size="xs" type="sub" className="line-clamp-1">
        {userName}
      </Title>
      <div className="flex gap-2">
        <Text type="caption" size="sm">
          @{email?.split('@')[0]}
        </Text>
      </div>
    </div>
  )
}
