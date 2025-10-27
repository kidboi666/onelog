import { queryOptions } from "@tanstack/react-query";
import { getMyUsedWords, getUsedWords } from "@/entities/word/api/word-api";
import { WORD_QUERY_KEY } from "@/entities/word/model/constants";
import type { IUsedWord, IWord } from "@/entities/word/model/types";
import type { APIError } from "@/shared/lib/errors/api-error";

export const wordQuery = {
  getMyUsedWords: (userId: string) =>
    queryOptions<IUsedWord | null, APIError>({
      queryKey: WORD_QUERY_KEY.USED(userId),
      queryFn: () => getMyUsedWords(userId),
    }),

  getUsedWords: (word: string, trigger: boolean) =>
    queryOptions<IWord | null, APIError>({
      queryKey: WORD_QUERY_KEY.DETAIL(word),
      queryFn: () => getUsedWords(word),
      enabled: trigger,
    }),
};
