import ColorPicker from './_components/ColorPicker'
import PasswordResetForm from './_components/PasswordResetForm'
import DarkModeSwitch from './_components/DarkModeSwitch'
import LogoutButton from './_components/LogoutButton'

export default function SettingsPage() {
  return (
    <>
      <PasswordResetForm />
      <ColorPicker />
      <DarkModeSwitch />
      <LogoutButton />
    </>
  )
}
