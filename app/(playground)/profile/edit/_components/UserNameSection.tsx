import { ComponentProps } from 'react'
import cn from '@/src/lib/cn'
import Input from '@/src/components/Input'
import { XStack, YStack } from '@/src/components/Stack'
import TextDisplay from '@/src/components/TextDisplay'
import Title from '@/src/components/Title'

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
          <TextDisplay
            size="sm"
            className={cn(value?.length > 10 && 'text-red-600')}
          >{`${value?.length} / 10`}</TextDisplay>
        )}
      </XStack>
    </YStack>
  )
}
