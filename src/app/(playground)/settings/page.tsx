import { Metadata } from 'next'

import { YStack } from '@/src/components/Stack'

import ColorPicker from './_components/ColorPicker'
import DarkModeSwitch from './_components/DarkModeSwitch'
import LogoutButton from './_components/LogoutButton'

export const metadata: Metadata = {
  title: 'Settings',
}

export default function SettingsPage() {
  return (
    <YStack gap={12} className="animate-fade-in">
      <ColorPicker />
      <DarkModeSwitch />
      <LogoutButton />
    </YStack>
  )
}
