import Avatar from '@/components/feature/user/Avatar'
import Box from '@/components/shared/Box'
import Line from '@/components/shared/Line'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'

interface Props {
  avatarUrl: string | null
  userName: string | null
}

export default function AboutMe({ avatarUrl, userName }: Props) {
  return (
    <>
      <Box className="pointer-events-none flex flex-col items-center gap-4">
        <Avatar src={avatarUrl} size="xl" ring="md" />
        <Box className="self-end">
          <Title className="text-2xl font-medium">{userName}</Title>
        </Box>
      </Box>
      <Box className="relative">
        <Line className="opacity-50" />
        <Text
          as="span"
          type="caption"
          className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-2 text-sm text-gray-400 dark:bg-var-darkgray"
        >
          소 개
        </Text>
      </Box>
    </>
  )
}
