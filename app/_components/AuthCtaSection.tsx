'use client'

import LinkButton from '@/components/shared/LinkButton'
import Title from '@/components/shared/Title'

export default function AuthCtaSection() {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-96 flex-col gap-12 p-4">
        <div className="flex flex-col gap-4">
          <Title>지금 가입하세요.</Title>
          <Title>당신의 글쓰기 루틴을 만드세요.</Title>
        </div>
        <div className="flex flex-col gap-4">
          <LinkButton href="/signup">가입하러 가기</LinkButton>
          <Title size="sm">이미 가입하셨나요?</Title>
          <LinkButton href="/signin" variant="secondary">
            로그인하러 가기
          </LinkButton>
        </div>
      </div>
    </div>
  )
}
