import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import Input from '@/components/shared/Input'
import RefBox from '@/components/shared/RefBox'
import Title from '@/components/shared/Title'
import useStateChange from '@/hooks/useStateChange'
import { ComponentProps } from 'react'

export default function UserNameSection({
  value,
  onChange,
}: ComponentProps<'input'>) {
  const [ref, open, close] = useStateChange<HTMLInputElement>()
  return (
    <Container className="flex w-full max-w-52 flex-col gap-8">
      <Title>필명</Title>
      <Box className="flex w-full flex-col">
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
    </Container>
  )
}
