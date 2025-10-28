import { ChangeEvent } from 'react'
import Button from '@/src/components/Button'
import Icon from '@/src/components/Icon'
import Input from '@/src/components/Input'
import { ZStack } from '@/src/components/Stack'
import TextDisplay from '@/src/components/TextDisplay'

type TaskInputProps = {
  todoText: string
  onChangeTodoText: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function TaskInput({
  todoText,
  onChangeTodoText,
}: TaskInputProps) {
  return (
    <>
      <ZStack>
        <Input
          value={todoText}
          onChange={onChangeTodoText}
          placeholder="할일을 입력하세요."
          dimension="sm"
          className="sticky w-full"
        />
        <Button
          variant="icon"
          size="none"
          type="submit"
          disabled={!todoText}
          className="absolute right-2 top-1/2 -translate-y-1/2 active:animate-none"
        >
          <Icon view="0 -960 960 960" size={18}>
            <path d="M440-160v-326L336-382l-56-58 200-200 200 200-56 58-104-104v326h-80ZM160-600v-120q0-33 23.5-56.5T240-800h480q33 0 56.5 23.5T800-720v120h-80v-120H240v120h-80Z" />
          </Icon>
        </Button>
      </ZStack>
      <TextDisplay type="caption" size="sm" className="text-nowrap">
        {`${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월 ${new Date().getDate()}일 오늘 할 일`}
      </TextDisplay>
    </>
  )
}
