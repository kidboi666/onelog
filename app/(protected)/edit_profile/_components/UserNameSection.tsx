import Input from '@/components/shared/Input'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import useDataDrivenAnimation from '@/hooks/useStateChange'
import cn from '@/lib/cn'
import { ComponentProps } from 'react'

interface Props extends ComponentProps<'input'> {
  value: string
}

export default function UserNameSection({ value, onChange }: Props) {
  const { ref, open, close } = useDataDrivenAnimation<HTMLInputElement>()
  return (
    <div className="flex w-full max-w-52 flex-col gap-8">
      <Title>필명</Title>
      <div className="flex w-full flex-col gap-2">
        <Input
          onFocus={() => open()}
          onBlur={() => close()}
          value={value}
          onChange={onChange}
        />
        <div className="self-end">
          {value && (
            <Text
              size="sm"
              className={cn(value?.length > 10 && 'text-red-600')}
            >{`${value?.length} / 10`}</Text>
          )}
        </div>
      </div>
    </div>
  )
}
