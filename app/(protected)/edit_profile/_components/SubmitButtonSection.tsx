import Button from '@/components/shared/Button'

interface Props {
  isPending: boolean
  disabled: boolean
}
export default function SubmitButtonSection({ isPending, disabled }: Props) {
  return (
    <Button type="submit" isLoading={isPending} disabled={disabled}>
      수정하기
    </Button>
  )
}
