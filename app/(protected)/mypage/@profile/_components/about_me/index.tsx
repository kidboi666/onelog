import Box from '@/components/shared/Box'
import Line from '@/components/shared/Line'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import Image from 'next/image'

interface Props {
  avatarUrl: string | null
  userName: string | null
}

export default function AboutMe({ avatarUrl, userName }: Props) {
  return (
    <>
      <Box className="pointer-events-none flex flex-col items-center gap-4">
        <Box className="relative size-52 overflow-hidden rounded-full border border-gray-400 dark:border-gray-600">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="프로필 이미지"
              fill
              className="dark:border-var-darkgray border-var-lightgray rounded-full border-4"
            />
          ) : (
            <Box className="absolute size-full bg-gray-200" />
          )}
        </Box>
        <Box className="self-end">
          <Title className="text-2xl font-medium">{userName}</Title>
        </Box>
      </Box>
      <Box className="relative">
        <Line className="opacity-50" />
        <Text
          as="span"
          type="caption"
          className="dark:bg-var-darkgray absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-2 text-sm text-gray-400"
        >
          소 개
        </Text>
      </Box>
    </>
  )
}
