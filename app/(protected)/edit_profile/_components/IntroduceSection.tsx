import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import Text from '@/components/shared/Text'
import TextArea from '@/components/shared/TextArea'
import Title from '@/components/shared/Title'
import cn from '@/lib/cn'
import { ComponentProps } from 'react'

interface Props extends ComponentProps<'textarea'> {
  value: string
}

export default function IntroduceSection({ value, onChange }: Props) {
  return (
    <Container className="flex w-full flex-col gap-8">
      <Title>소개글</Title>
      <TextArea value={value} onChange={onChange} className="px-2 py-1" />
      <Box className="self-end">
        {value && (
          <Text
            size="sm"
            className={cn(value?.length > 150 && 'text-red-600')}
          >{`${value?.length} / 150`}</Text>
        )}
      </Box>
    </Container>
  )
}
