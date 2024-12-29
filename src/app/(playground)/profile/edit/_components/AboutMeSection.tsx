import { ComponentProps } from 'react'
import cn from '@/src/lib/cn'
import { XStack, YStack } from '@/src/components/Stack'
import Text from '@/src/components/Text'
import TextArea from '@/src/components/TextArea'
import Title from '@/src/components/Title'

interface Props extends ComponentProps<'textarea'> {
  value: string
}

export default function AboutMeSection({ value, onChange }: Props) {
  return (
    <YStack gap={4}>
      <Title>한줄 소개</Title>
      <XStack className="items-end">
        <TextArea
          value={value ?? ''}
          onChange={onChange}
          className="bg-var-lightgray p-2 dark:bg-var-dark"
        />
        {value && (
          <Text
            size="sm"
            className={cn('text-nowrap', value?.length > 150 && 'text-red-600')}
          >{`${value?.length} / 150`}</Text>
        )}
      </XStack>
    </YStack>
  )
}
