import { queryOptions } from '@tanstack/react-query'

export const sentenceQuery = {
  getSentence: (supabase: any, userId: string) =>
    queryOptions({
      queryKey: ['sentence'],
      queryFn: async () => {
        const { data } = await supabase
          .from('sentence')
          .select()
          .eq('user_id', userId)

        return data
      },
      enabled: !!userId,
    }),
}
