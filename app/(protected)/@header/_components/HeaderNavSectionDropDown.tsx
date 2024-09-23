import { MouseEvent, RefObject } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import useSignOut from '@/services/mutates/auth/useSignOut'
import { meQuery } from '@/services/queries/auth/meQuery'
import Title from '@/components/shared/Title'
import Avatar from '@/components/feature/user/Avatar'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import LinkButton from '@/components/shared/LinkButton'
import Text from '@/components/shared/Text'
import Line from '@/components/shared/Line'
import { useTheme } from '@/store/useTheme'
import { TTheme } from '@/types/theme'
import cn from '@/lib/cn'

interface Props {
  targetRef: RefObject<HTMLDivElement>
  onTransitionEnd: () => void
}

export default function HeaderNavSectionDropDown({
  targetRef,
  onTransitionEnd,
}: Props) {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { mutate: signOut } = useSignOut()
  const validateEmail = me?.email?.split('@')[0]
  const { theme, setTheme } = useTheme()

  const changeDocumentClass = (theme: TTheme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleThemeChange = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    changeDocumentClass(nextTheme)
  }

  return (
    <div
      ref={targetRef}
      data-status="closed"
      onTransitionEnd={onTransitionEnd}
      className="data-slideDown status-slideDown absolute right-0 top-[calc(100%--4px)] hidden h-fit w-60 origin-top-right rounded-md bg-white p-2 shadow-md dark:bg-var-darkgray"
    >
      <LinkButton
        href="/mypage"
        variant="list"
        className="flex"
        innerClassName="flex gap-4"
      >
        <Avatar src={me?.avatar_url} size="sm" ring="xs" shadow="sm" />
        <div className="flex flex-col items-start">
          <Title size="xs">{me?.user_name}</Title>
          <Text type="caption" size="sm">
            @{validateEmail}
          </Text>
          <div className="flex gap-2">
            <Text size="sm" className="text-nowrap">
              마이 페이지 가기
            </Text>
            <div className="flex items-center text-zinc-500 dark:text-zinc-400">
              <Icon view={150} size={10}>
                <g id="forward">
                  <path d="M16.09,142.64c-2.36-10.16-3.01-21.3-.9-32.59,2.08-11.27,6.82-22.55,13.82-32.64,6.99-10.11,16.1-19.07,26.87-26.32,5.39-3.63,11.23-6.81,17.55-9.46,6.33-2.64,13.15-4.75,20.67-5.99v58c-2.67-1.19-6.02-2.04-9.63-2.48-3.62-.43-7.52-.48-11.48-.08-7.94.78-16.17,3.15-23.83,7.19-7.67,4.04-14.8,9.82-20.58,17.36-5.78,7.52-10.01,16.82-12.48,27.01Z" />
                  <polygon points="70.09 125.86 70.09 7.36 136.09 66.61 70.09 125.86" />
                </g>
              </Icon>
            </div>
          </div>
        </div>
      </LinkButton>
      <div className="sm:hidden">
        <LinkButton
          href="/post"
          variant="list"
          innerClassName="py-2 flex gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 -960 960 960"
            width="18px"
            fill="currentColor"
          >
            <path d="M560-80v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v120h-80v-80H520v-200H240v640h240v80H240Zm280-400Zm241 199-19-18 37 37-18-19Z" />
          </svg>
          글쓰기
        </LinkButton>
        <LinkButton
          href="/post/sentence"
          variant="list"
          innerClassName="py-2 flex gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 -960 960 960"
            width="18px"
            fill="currentColor"
          >
            <path d="M80 0v-160h800V0H80Zm160-320h56l312-311-29-29-28-28-311 312v56Zm-80 80v-170l448-447q11-11 25.5-17t30.5-6q16 0 31 6t27 18l55 56q12 11 17.5 26t5.5 31q0 15-5.5 29.5T777-687L330-240H160Zm560-504-56-56 56 56ZM608-631l-29-29-28-28 57 57Z" />
          </svg>
          한줄쓰기
        </LinkButton>
        <LinkButton
          href="/todo"
          variant="list"
          innerClassName="py-2 flex gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 -960 960 960"
            width="18px"
            fill="currentColor"
          >
            <path d="m381-240 424-424-57-56-368 367-169-170-57 57 227 226Zm0 113L42-466l169-170 170 170 366-367 172 168-538 538Z" />
          </svg>
          할일 관리
        </LinkButton>
      </div>
      <div className="flex">
        <LinkButton href="/settings" variant="list" innerClassName="py-2 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 -960 960 960"
            width="18px"
            fill="currentColor"
          >
            <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
          </svg>
          설정
        </LinkButton>
      </div>
      <Button
        variant="list"
        onClick={handleThemeChange}
        className="flex w-full items-center justify-between gap-2 py-2"
      >
        <div className="flex gap-2">
          <Icon view="0 -960 960 960" size={18}>
            <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
          </Icon>
          다크모드
        </div>
        <div
          className={cn(
            'h-fit w-8 rounded-full border border-zinc-400 dark:border-zinc-600',
            theme === 'dark' ? 'bg-green-500' : 'bg-zinc-400',
          )}
        >
          <div
            className={cn(
              'size-4 rounded-full bg-zinc-200',
              theme === 'dark' ? 'translate-x-4' : '',
            )}
          />
        </div>
      </Button>
      <Line />
      <Button
        onClick={() => signOut()}
        variant="list"
        className="flex w-full gap-2 py-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="18px"
          fill="currentColor"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
        </svg>
        로그아웃
      </Button>
    </div>
  )
}
