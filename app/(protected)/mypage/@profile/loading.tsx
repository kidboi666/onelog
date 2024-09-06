import Box from '@/components/shared/Box'
import Spinner from '@/components/shared/Spinner'

export default function Loading() {
  return (
    <Box className="flex w-full justify-center">
      <Spinner size={60} />
    </Box>
  )
}
