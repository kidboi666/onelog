import BackButton from '@/components/shared/BackButton'
import Icon from '@/components/shared/Icon'
import { XStack, ZStack } from '@/components/shared/Stack'
import Text from '@/components/shared/Text'

export default function DateLabelContainer() {
  const current = new Date()
  const year = current.getFullYear()
  const month = current.getMonth().toString().padStart(2, '0')
  const date = current.getDate().toString().padStart(2, '0')

  return (
    <ZStack gap={4}>
      <BackButton className="bg-white p-2 shadow-sm dark:bg-var-darkgray">
        <Icon size={18}>
          <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
        </Icon>
      </BackButton>
      <XStack className="size-full justify-center rounded-md bg-white p-2 shadow-sm dark:bg-var-darkgray">
        <Text size="md" type="caption">
          {`${year}. ${month}. ${date}`}
        </Text>
      </XStack>
    </ZStack>
  )
}
