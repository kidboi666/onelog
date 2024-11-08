import ReportCommentModal from '@/app/(modals)/report_comment/[commentId]/page'

interface Props {
  params: { commentId: string }
}

export default function Page({ params }: Props) {
  return <ReportCommentModal params={params} />
}
