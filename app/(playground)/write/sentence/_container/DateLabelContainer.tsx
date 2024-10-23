import BackButton from '@/components/shared/BackButton'
import Container from '@/components/shared/Container'
import Icon from '@/components/shared/Icon'
import Text from '@/components/shared/Text'

export default function DateLabelContainer() {
  const current = new Date()
  const year = current.getFullYear()
  const month = current.getMonth().toString().padStart(2, '0')
  const date = current.getDate().toString().padStart(2, '0')

  return (
    <div className="relative flex items-start gap-4">
      <BackButton className="bg-white p-2 shadow-sm dark:bg-var-darkgray">
        <Icon>
          <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
        </Icon>
      </BackButton>
      <div className="flex size-full items-center justify-center rounded-md bg-white p-2 shadow-sm dark:bg-var-darkgray">
        <Text size="md" type="caption">
          {`${year}. ${month}. ${date}`}
        </Text>
      </div>
    </div>
  )
}
