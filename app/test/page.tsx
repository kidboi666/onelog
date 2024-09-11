import Box from '@/components/shared/Box'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import Image from 'next/image'

export default function TestPage() {
  return (
    <>
      <Box className="relative size-40">
        <Image
          src="drive-download-20240910T131555Z-001/15.svg"
          alt="img"
          fill
          className="bg-black"
        />
      </Box>
      <Button variant="secondary">
        <Icon view={150}></Icon>
      </Button>
    </>
  )
}
