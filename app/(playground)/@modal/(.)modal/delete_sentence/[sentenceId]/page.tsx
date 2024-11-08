import DeleteSentenceModal from '@/app/(playground)/modal/delete_sentence/[sentenceId]/page'

interface Props {
  params: { sentenceId: string }
}

export default function Page({ params }: Props) {
  return <DeleteSentenceModal params={params} />
}
