import ColorPicker from './_components/ColorPicker'
import PasswordResetForm from './_components/PasswordResetForm'
import DarkModeSwitch from './_components/DarkModeSwitch'
import LogoutButton from './_components/LogoutButton'
import Button from '@/components/shared/Button'

export default function SettingsPage() {
  return (
    <>
      <PasswordResetForm />
      <ColorPicker />
      <DarkModeSwitch />
      <LogoutButton />
      <Button>Primary</Button>
      <Button disabled>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="teritory">teritory</Button>
    </>
  )
}
