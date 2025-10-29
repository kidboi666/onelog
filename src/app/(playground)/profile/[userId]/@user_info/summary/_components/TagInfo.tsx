import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import type { RefObject } from "react";
import type { IFavoriteWord } from "@/entities/word/api/dtos";
import { wordQuery } from "@/entities/word/api/queries";

interface Props {
  word: IFavoriteWord;
  trigger: boolean;
  onTransitionEnd: () => void;
  targetRef: RefObject<HTMLDivElement | null>;
}

export default function TagInfo({
  word,
  onTransitionEnd,
  trigger,
  targetRef,
}: Props) {
  const { data, isFetching } = useQuery(
    wordQuery.getUsedWords(word.word, trigger),
  );

  return (
    <div
      data-status="closed"
      onTransitionEnd={onTransitionEnd}
      ref={targetRef}
      className="data-slideDown status-slideDown -top-10 absolute z-10 hidden origin-bottom-left text-nowrap rounded-md bg-white p-2 shadow-md dark:bg-var-darkgray"
    >
      {isFetching ? (
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      ) : (
        <>
          <p className="text-xs">단어 사용 횟수 : {word.count}</p>
          <p className="text-xs">다른 사람들이 사용한 횟수 : {data?.count}</p>
        </>
      )}
    </div>
  );
}
