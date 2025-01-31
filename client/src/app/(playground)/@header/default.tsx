import { XStack } from '@/src/components/Stack'
import MenuButton from './_components/MenuButton'
import ThemeToggleButton from './_components/ThemeToggleButton'

export default function Default() {
  return (
    <header className="sticky top-0 z-50 sm:hidden">
      <div className="w-full rounded-md bg-white/60 p-2 shadow-lg backdrop-blur-xl lg:px-12 dark:bg-var-darkgray/60">
        <XStack className="h-full items-center justify-between">
          <MenuButton />
          <ThemeToggleButton isOpen viewToggle />
        </XStack>
      </div>
    </header>
  )
}
