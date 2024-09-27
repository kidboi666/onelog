import Text from '@/components/shared/Text'
import useStateChange from '@/hooks/useStateChange'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { HEADER_MENU } from '../_constants'
import { useEffect, useTransition } from 'react'
import Button from '@/components/shared/Button'
import Spinner from '@/components/shared/Spinner'
import Icon from '@/components/shared/Icon'
import { useTodo } from '@/store/useTodo'

interface Props {
  menu: (typeof HEADER_MENU)[number]
}

export default function HeaderMenu({ menu }: Props) {
  const {
    ref: menuInfoRef,
    open: openMenuInfo,
    close: closeMenuInfo,
    onTransitionEnd: onTransitionEndMenuInfo,
  } = useStateChange<HTMLDivElement>()
  const { setSelectedFolder, setSelectedMenu } = useTodo()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, startTransition] = useTransition()

  const handleMenuButtonClick = () => {
    closeMenuInfo()
    if (menu.path === '/todo/main') {
      setSelectedFolder(null)
      setSelectedMenu('main')
      return router.push('/todo/main')
    }
    const params = searchParams.toString()
    router.push(`${menu.path}?${params}`)
  }

  useEffect(() => {
    closeMenuInfo()
  }, [pathname])

  return (
    <div className="relative">
      <Button
        onClick={() => startTransition(() => handleMenuButtonClick())}
        variant="list"
        onMouseEnter={() => {
          openMenuInfo()
        }}
        onMouseLeave={() => {
          closeMenuInfo()
        }}
      >
        {isLoading ? (
          <Spinner size={18} />
        ) : (
          <Icon view="0 -960 960 960" size={18}>
            {menu.icon}
          </Icon>
        )}
      </Button>
      <div
        ref={menuInfoRef}
        data-status="closed"
        onTransitionEnd={onTransitionEndMenuInfo}
        className="data-slideDown status-slideDown absolute top-full hidden text-nowrap"
      >
        <Text type="body" size="sm">
          {menu.name}
        </Text>
      </div>
    </div>
  )
}
