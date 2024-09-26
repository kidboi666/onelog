'use client'

import React, {
  FormEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import Line from '@/components/shared/Line'
import Spinner from '@/components/shared/Spinner'
import Text from '@/components/shared/Text'
import TextArea from '@/components/shared/TextArea'
import Title from '@/components/shared/Title'
import { useInput } from '@/hooks/useInput'
import useStateChange from '@/hooks/useStateChange'
import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import useUpdateTodo from '@/services/mutates/todo/useUpdateTodo'
import { meQuery } from '@/services/queries/auth/meQuery'
import { todoQuery } from '@/services/queries/todo/todoQuery'
import { formatDateToHM, formatDateToMDY } from '@/utils/formatDate'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  params: { todoId: string }
}

export default function Page({ params }: Props) {
  const queryClient = getQueryClient()
  const router = useRouter()
  const todoId = params.todoId
  const folderId = useSearchParams().get('folder_id') || ''
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: todos } = useSuspenseQuery(
    todoQuery.getTodoFromFolder(supabase, me.userId, Number(folderId)),
  )
  const todo = todos?.find((item) => item.id === Number(todoId))
  const [memo, onChangeMemo, setMemo] = useInput<string>('')
  const [name, onChangeName, setName] = useInput<string>('')
  const { close, open, ref: insideRef } = useStateChange<HTMLDivElement>()
  const { mutate: updateTodo } = useUpdateTodo()
  const [isLoadingDelete, startTransitionDelete] = useTransition()
  const [showInput, setShowInput] = useState(false)
  const isMouseDown = useRef<boolean>(false)

  const handleCloseTodoInfo = () => {
    close()
    setTimeout(() => {
      router.back()
    }, 100)
  }

  const handleMouseDown = () => {
    isMouseDown.current = true
  }

  const handleMouseUp = () => {
    if (isMouseDown.current) {
      handleCloseTodoInfo()
    }
    isMouseDown.current = false
  }

  const handleUpdateButtonClick = () => {
    todo!.is_complete
      ? updateTodo(
          {
            ...todo!,
            is_complete: false,
            updated_at: new Date().toISOString(),
          },
          {
            onSuccess: () => {
              router.back()
            },
          },
        )
      : updateTodo(
          {
            ...todo!,
            is_complete: true,
            updated_at: new Date().toISOString(),
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['todo', folderId],
              })
              router.back()
            },
          },
        )
  }

  const handleChangeInput = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowInput(true)
  }

  const handleInsideClick = () => {
    setShowInput(false)
    if (todo?.name !== name) {
      updateTodo({ ...todo!, name, updated_at: new Date().toISOString() })
    }
  }

  const handleDeleteButtonClick = () => {
    startTransitionDelete(() =>
      router.push(`/delete_todo/${todoId}?folder_id=${folderId}`, {
        scroll: false,
      }),
    )
  }

  const handleSubmitMemo = (e: FormEvent) => {
    e.preventDefault()
    updateTodo(
      { ...todo!, memo, updated_at: new Date().toISOString() },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todo', 'in_progress'] })
        },
      },
    )
  }

  useEffect(() => {
    setMemo(todo?.memo ?? '')
    setName(todo?.name!)
    setTimeout(() => {
      open()
    }, 100)
  }, [])

  useEffect(() => {
    if (!todo) {
      handleCloseTodoInfo()
    }
  }, [todo])

  return (
    <div className="fixed inset-0 z-40">
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="fixed inset-0 z-40 animate-fade-in overflow-hidden bg-black/15"
      />
      <div
        ref={insideRef}
        onClick={handleInsideClick}
        data-status="closed"
        className="absolute bottom-0 right-0 z-50 flex h-full w-80 origin-right flex-col justify-between gap-4 overflow-hidden bg-white p-4 shadow-md transition data-[status=closed]:translate-x-20 data-[status=closed]:opacity-0 dark:bg-var-darkgray"
      >
        <Button variant="icon" onClick={handleCloseTodoInfo} className="w-fit">
          <Icon>
            <g>
              <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
            </g>
          </Icon>
        </Button>
        <div
          onClick={handleChangeInput}
          className="relative w-full justify-between"
        >
          {showInput ? (
            <TextArea
              value={name}
              onChange={onChangeName}
              className="w-full text-lg font-semibold text-zinc-600 dark:text-zinc-200"
            />
          ) : (
            <Title size="sm" className="hyphens-auto break-all">
              {todo?.name}
            </Title>
          )}
          {!showInput && (
            <Button
              variant="icon"
              size="none"
              className="absolute bottom-0 right-2"
            >
              <Icon view="0 -960 960 960" size={20}>
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
              </Icon>
            </Button>
          )}
        </div>
        <form
          onSubmit={handleSubmitMemo}
          className="flex flex-1 flex-col gap-4"
        >
          <Line />
          <Title size="xs">등록일</Title>
          <Text>
            {formatDateToMDY(todo?.created_at!)}년{' '}
            {formatDateToHM(todo?.created_at!)}
          </Text>
          <Line />
          <Title size="xs">메모</Title>
          <TextArea
            value={memo}
            onChange={onChangeMemo}
            placeholder="메모를 입력하세요."
            className="p-2 ring-1 ring-zinc-200 dark:ring-zinc-600"
          />
          <Button
            variant="secondary"
            type="submit"
            disabled={!memo || memo === todo?.memo}
            className="self-end"
          >
            메모 추가
          </Button>
          <Line />
          <Title size="xs">완료 상태</Title>
          <Text>{todo?.is_complete ? '완료' : '미완료'}</Text>
        </form>
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className="flex justify-between gap-4"
        >
          <Button variant="icon" onClick={handleUpdateButtonClick}>
            <Icon view="0 -960 960 960">
              {todo?.is_complete ? (
                <path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z" />
              ) : (
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              )}
            </Icon>
          </Button>
          <Button onClick={handleDeleteButtonClick} variant="icon">
            {isLoadingDelete ? (
              <Spinner size={20} />
            ) : (
              <Icon view="0 -960 960 960">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </Icon>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
