import Box from '@/components/shared/Box'
import Line from '@/components/shared/Line'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import Image from 'next/image'

interface Props {
  avatarUrl: string | null
  nickname: string | null
}

export default function AboutMe({ avatarUrl, nickname }: Props) {
  return (
    <>
      <Box className="pointer-events-none flex flex-col justify-center max-sm:justify-between">
        <Box className="relative overflow-hidden rounded-full border border-gray-400 max-sm:size-52 sm:size-40 xl:sticky xl:z-30 xl:-translate-y-20 dark:border-gray-600">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="프로필 이미지"
              fill
              className="rounded-full border-4 border-gray-50 dark:border"
            />
          ) : (
            <Box className="absolute size-full bg-gray-200" />
          )}
        </Box>
        <Box className="self-end xl:absolute xl:top-40">
          <Title className="text-4xl font-medium">
            <Text as="span" className="mr-2">
              By
            </Text>
            {nickname}
          </Title>
        </Box>
      </Box>
      <Box className="relative">
        <Line className="opacity-50" />
        <Text
          as="span"
          type="caption"
          className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gray-50 px-2 text-sm text-gray-400 dark:bg-var-dark"
        >
          소 개
        </Text>
      </Box>
    </>
  )
}
