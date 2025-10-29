"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { wordQuery } from "@/entities/word/api/queries";
import { UserFavoriteWords } from "@/entities/word/ui";

interface Props {
  userId: string;
}

export function UserFavoriteWordsView({ userId }: Props) {
  const { data: usedWords } = useSuspenseQuery(wordQuery.getMyUsedWords(userId));

  return <UserFavoriteWords words={usedWords?.words ?? []} />;
}
