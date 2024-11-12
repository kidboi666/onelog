import Spinner from '@/components/shared/Spinner'

export default function Loading() {
  return (
    <Spinner.Container>
      <Spinner size={60} />
    </Spinner.Container>
  )
}
