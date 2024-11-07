import ColorPicker from './_components/ColorPicker'
import PasswordResetForm from './_components/PasswordResetForm'
import DarkModeSwitch from './_components/DarkModeSwitch'
import LogoutButton from './_components/LogoutButton'
import { YStack } from '@/components/shared/Stack'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings',
}

export default function SettingsPage() {
  return (
    <YStack gap={12} className="animate-fade-in">
      <PasswordResetForm />
      <ColorPicker />
      <DarkModeSwitch />
      <LogoutButton />
    </YStack>
  )
}
