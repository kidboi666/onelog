import type { IFavoriteWord } from "@/entities/word/api/dtos";
import FavoriteWordTag from "@/app/(playground)/profile/[userId]/@user_info/summary/_components/FavoriteWordTag";

interface Props {
  words: IFavoriteWord[];
}

export function UserFavoriteWords({ words }: Props) {
  const sortedWords = words?.sort((a, b) => b.count - a.count) ?? [];
  const shouldRenderWords = sortedWords?.filter((word) => word.count > 1);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-8">
        <h2 className="font-bold text-xl">가장 많이 사용하는</h2>
        {shouldRenderWords && shouldRenderWords.length >= 1 ? (
          <div className="flex flex-wrap gap-2">
            {shouldRenderWords.slice(0, 20).map((word) => (
              <FavoriteWordTag key={word.word} word={word} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground text-sm">
              아직 자주 사용하는 단어가 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
