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
      <div className="flex w-full flex-col gap-2">
        <Button>Primary</Button>
        <Button disabled>Primary</Button>
        <Button variant="teritory">teritory</Button>
        <Button variant="secondary">Secondary</Button>
      </div>
    </>
  )
}
