import DeleteSentenceModal from '@/app/(modals)/delete_sentence/page'

interface Props {
  params: { sentence_id: string }
}

export default function Page({ params }: Props) {
  return <DeleteSentenceModal params={params} />
}
