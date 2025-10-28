'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { MoreVertical, Edit2, Trash2 } from 'lucide-react'
import { useMe } from '@/app/_store/use-me'
import { postQueries } from '@/entities/post/api/queries'
import { ROUTES } from '@/app/_routes/constants'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'

interface BaseProps {
  isSide?: boolean
  postId: number
}

interface PostProps extends BaseProps {
  type: 'post'
}

interface CommentProps extends BaseProps {
  type: 'comment'
  commentId: number
  commentAuthorId: string
  onModify: () => void
}

type Props = PostProps | CommentProps

const checkIsOwner = (myId?: string | null, ownerId?: string) => {
  return myId === ownerId
}

export default function OptionButtonWithDropDown(props: Props) {
  const router = useRouter()
  const { me } = useMe()
  const { data: post } = useSuspenseQuery(
    postQueries.getPost(props.postId, me?.id),
  )

  const isOwner =
    props.type === 'comment'
      ? checkIsOwner(me?.id, props.commentAuthorId)
      : checkIsOwner(me?.id, post?.userId)

  if (!isOwner) {
    return null
  }

  const pushDeleteModal = () => {
    if (props.type === 'comment') {
      router.push(ROUTES.MODAL.COMMENT.DELETE(props.commentId, props.postId))
    } else {
      router.push(ROUTES.MODAL.POST.DELETE(props.postId))
    }
  }

  const pushEditPage = () => {
    if (props.type === 'comment') {
      props.onModify()
    } else {
      router.push(ROUTES.POST.EDIT(props.postId))
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={props.isSide ? 'default' : 'icon'}
          className="h-auto p-2"
        >
          <MoreVertical className={props.isSide ? 'h-6 w-6' : 'h-4 w-4'} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={props.isSide ? 'start' : 'end'}>
        <DropdownMenuItem onClick={pushEditPage} className="gap-2 cursor-pointer">
          <Edit2 className="h-4 w-4" />
          수정하기
        </DropdownMenuItem>
        <DropdownMenuItem onClick={pushDeleteModal} className="gap-2 cursor-pointer">
          <Trash2 className="h-4 w-4" />
          삭제하기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
