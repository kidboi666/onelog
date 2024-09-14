import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()
  return (
    <Button
      variant="secondary"
      onClick={() => router.back()}
      className="border-gray-300 text-gray-400"
    >
      <Icon>
        <g>
          <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
        </g>
      </Icon>
    </Button>
  )
}
