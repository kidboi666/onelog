import DeleteSentenceModal from '@/app/(modals)/delete_sentence/[sentenceId]/page'

interface Props {
  params: { sentenceId: string }
}

export default function Page({ params }: Props) {
  return <DeleteSentenceModal params={params} />
}
