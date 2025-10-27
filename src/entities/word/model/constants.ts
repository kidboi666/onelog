export const WORD_QUERY_KEY = {
  USED: (authorId: string) => ["word", authorId],
  DETAIL: (word: string) => ["word", word],
};
