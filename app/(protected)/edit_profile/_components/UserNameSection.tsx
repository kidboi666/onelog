import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import Input from '@/components/shared/Input'
import RefBox from '@/components/shared/RefBox'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import useStateChange from '@/hooks/useStateChange'
import cn from '@/lib/cn'
import { ComponentProps } from 'react'

interface Props extends ComponentProps<'input'> {
  value: string
}

export default function UserNameSection({ value, onChange }: Props) {
  const { ref, open, close } = useStateChange<HTMLInputElement>()
  return (
    <Container className="flex w-full max-w-52 flex-col gap-8">
      <Title>필명</Title>
      <Box className="flex w-full flex-col gap-2">
        <Box col>
          <Input
            onFocus={() => open()}
            onBlur={() => close()}
            variant="secondary"
            value={value}
            onChange={onChange}
          />
          <RefBox
            ref={ref}
            dataStatus="closed"
            className="status-line data-line bg-gray-800 dark:bg-white"
          />
        </Box>
        <Box className="self-end">
          {value && (
            <Text
              size="sm"
              className={cn(value?.length > 8 && 'text-red-600')}
            >{`${value?.length} / 8`}</Text>
          )}
        </Box>
      </Box>
    </Container>
  )
}
