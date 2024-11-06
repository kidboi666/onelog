import Text from '@/components/shared/Text'

interface Props {
  followerCount: number
}

export default function FollowerButton({ followerCount }: Props) {
  return (
    <Text type="caption" size="sm">
      팔로우 {followerCount}명
    </Text>
  )
}
