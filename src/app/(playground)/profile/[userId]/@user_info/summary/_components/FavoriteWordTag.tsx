import { useState } from "react";
import type { IFavoriteWord } from "@/entities/word/api/dtos";
import useOutsideClick from "@/hooks/useOutsideClick";
import useDataDrivenAnimation from "@/hooks/useStateChange";
import { Button } from "@/shared/components/ui/button";
import TagInfo from "./TagInfo";

interface Props {
  word: IFavoriteWord;
}

export default function FavoriteWordTag({ word }: Props) {
  const [trigger, setTrigger] = useState(false);
  const { onClick, ref, close, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>();
  const buttonRef = useOutsideClick<HTMLButtonElement>(close);

  const handleTagClick = () => {
    onClick();
    setTrigger(true);
  };
  return (
    <div className="relative">
      <Button
        variant="secondary"
        size="sm"
        ref={buttonRef}
        onClick={handleTagClick}
        className="relative bg-white font-light text-gray-600 text-xs shadow-md dark:bg-var-darkgray"
      >
        {word.word}
      </Button>
      <TagInfo
        word={word}
        trigger={trigger}
        onTransitionEnd={onTransitionEnd}
        targetRef={ref}
      />
    </div>
  );
}
