import LinkButton from '@/components/shared/LinkButton'
import Title from '@/components/shared/Title'
import Image from 'next/image'
import { PropsWithChildren } from 'react'

export default function MainPage({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center md:flex-row">
      <div className="relative h-80 w-full md:size-full">
        <Image
          src="logo-vertical.svg"
          fill
          alt="로고 이미지"
          className="object-fill"
        />
      </div>

      <div className="flex w-full flex-col justify-center gap-12 p-8">
        <div className="flex flex-col gap-4">
          <Title>지금 가입하세요.</Title>
          <Title>당신의 글쓰기 루틴을 만드세요.</Title>
        </div>
        <div className="flex flex-col gap-4">
          <LinkButton href="/signup">가입하러 가기</LinkButton>
          <Title size="sm">이미 하루한줄에 가입하셨나요?</Title>
          <LinkButton href="/signin" variant="secondary">
            로그인하러 가기
          </LinkButton>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
