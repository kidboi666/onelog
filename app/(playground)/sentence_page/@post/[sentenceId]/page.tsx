import { YStack } from '@/components/shared/Stack'
import SentenceContainer from './_containers/SentenceContainer'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { createServerClient } from '@/lib/supabase/server'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { ISentenceWithUserInfo } from '@/types/sentence'

interface Props {
  params: { sentenceId: string }
}

export async function generateMetadata({ params }: Props) {
  const queryClient = getQueryClient()
  const supabase = createServerClient()
  await queryClient.prefetchQuery(
    sentenceQuery.getSentence(supabase, Number(params.sentenceId)),
  )
  const sentence = queryClient.getQueryData<ISentenceWithUserInfo>([
    'sentence',
    Number(params.sentenceId),
  ])
  return {
    title: sentence?.title ?? `${sentence?.user_info.user_name}님의 글`,
  }
}

export default function SentencePage({ params }: Props) {
  const sentenceId = parseInt(params.sentenceId)

  return (
    <YStack gap={8} className="animate-fade-in">
      <SentenceContainer sentenceId={sentenceId} />
    </YStack>
  )
}
