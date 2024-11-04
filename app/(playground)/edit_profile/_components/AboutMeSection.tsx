import Text from '@/components/shared/Text'
import TextArea from '@/components/shared/TextArea'
import Title from '@/components/shared/Title'
import cn from '@/lib/cn'
import { ComponentProps } from 'react'

interface Props extends ComponentProps<'textarea'> {
  value: string
}

export default function AboutMeSection({ value, onChange }: Props) {
  return (
    <div className="flex w-full flex-col gap-8">
      <Title>소개글</Title>
      <div className="flex flex-col gap-2">
        <TextArea value={value ?? ''} onChange={onChange} className="p-2" />
        <div className="self-end">
          {value && (
            <Text
              size="sm"
              className={cn(value?.length > 150 && 'text-red-600')}
            >{`${value?.length} / 150`}</Text>
          )}
        </div>
      </div>
    </div>
  )
}
