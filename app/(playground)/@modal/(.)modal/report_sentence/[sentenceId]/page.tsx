import ReportSentenceModal from '@/app/(playground)/modal/report_sentence/[sentenceId]/page'

interface Props {
  params: { sentenceId: string }
}

export default function Page({ params }: Props) {
  return <ReportSentenceModal params={params} />
}
