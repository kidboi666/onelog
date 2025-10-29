import { type ChangeEvent, useCallback, useEffect, useState } from "react";
import type {
  IUpdatePostFormActions,
  IUpdatePostFormStates,
} from "@/entities/post";
import type { IPostDetail } from "@/entities/post/model/types";
import type { EmotionLevel } from "@/shared/types/enums";
import { Access, PostType } from "@/shared/types/enums";

export function usePostForm(initialPost: IPostDetail | null): {
  states: IUpdatePostFormStates;
  actions: IUpdatePostFormActions;
} {
  const [formState, setFormState] = useState<
    Omit<IUpdatePostFormStates, "content" | "tags">
  >({
    emotionLevel: null,
    accessType: Access.PUBLIC,
    postType: PostType.ARTICLE,
    title: initialPost?.title ?? null,
  });
  const [content, setContent] = useState(initialPost?.content ?? "");
  const [tags, setTags] = useState(initialPost?.tags ?? []);

  const handleChangeEmotion = useCallback(
    (emotionLevel: EmotionLevel | null) => {
      setFormState((prev) => ({ ...prev, emotionLevel }));
    },
    [],
  );

  const handleChangeAccessType = useCallback((accessType: Access) => {
    setFormState((prev) => ({ ...prev, accessType }));
  }, []);

  const handleChangePostType = useCallback((postType: PostType) => {
    setFormState((prev) => ({ ...prev, postType }));
  }, []);

  const handleChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, title: e.target.value }));
  }, []);

  useEffect(() => {
    if (formState.postType === PostType.ARTICLE) {
      handleChangeEmotion(null);
    } else {
      handleChangeEmotion(50);
    }
  }, [formState.postType]);

  return {
    states: { ...formState, content, tags },
    actions: {
      onChangeEmotion: handleChangeEmotion,
      onChangeAccessType: handleChangeAccessType,
      onChangePostType: handleChangePostType,
      onChangeTitle: handleChangeTitle,
      setContent,
      setTags,
    },
  };
}
