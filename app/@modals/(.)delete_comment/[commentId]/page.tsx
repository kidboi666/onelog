import DeleteCommentModal from '@/app/(modals)/delete_comment/[commentId]/page'

interface Props {
  params: { commentId: string }
  searchParams: { sentence_id: string }
}

export default function Page({ params, searchParams }: Props) {
  return <DeleteCommentModal params={params} searchParams={searchParams} />
}
