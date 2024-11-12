import Input from '@/components/shared/Input'
import { XStack, YStack } from '@/components/shared/Stack'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import cn from '@/lib/cn'
import { ComponentProps } from 'react'

interface Props extends ComponentProps<'input'> {
  value: string
}

export default function UserNameSection({ value, onChange }: Props) {
  return (
    <YStack gap={4} className="max-w-52">
      <Title>필명</Title>
      <XStack className="items-end">
        <Input
          value={value}
          onChange={onChange}
          className="bg-var-lightgray dark:bg-var-dark"
        />
        {value && (
          <Text
            size="sm"
            className={cn(value?.length > 10 && 'text-red-600')}
          >{`${value?.length} / 10`}</Text>
        )}
      </XStack>
    </YStack>
  )
}
