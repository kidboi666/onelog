import SentenceInfoModal from '@/app/(protected)/(modals)/sentence_info/[sentenceId]/page'

interface Props {
  params: { sentenceId: string }
}

export default function Page({ params }: Props) {
  return <SentenceInfoModal params={params} />
}
