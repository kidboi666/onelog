import ReportSentenceModal from '@/app/(modals)/report_sentence/[sentenceId]/page'

interface Props {
  params: { sentenceId: string }
}

export default function Page({ params }: Props) {
  return <ReportSentenceModal params={params} />
}
