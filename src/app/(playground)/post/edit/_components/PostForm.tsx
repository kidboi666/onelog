import { type Editor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import type {
  IUpdatePostFormActions,
  IUpdatePostFormStates,
} from "@/entities/post";
import useBlockEditor from "@/hooks/useBlockEditor";
import EmotionGauge from "@/shared/components/emotion-gauge";
import { TagsInput } from "@/shared/components/tags-input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import usePostSubmit from "../_hooks/usePostSubmit";
import BubbleMenuBar from "./BubbleMenuBar";
import MobileOptionSection from "./MobileOptionSection";

interface Props {
  postId: number;
  avatarUrl: string | null;
  userName: string | null;
  email: string;
  formState: IUpdatePostFormStates;
  actions: IUpdatePostFormActions;
  meId: string;
}

export default function PostForm({
  postId,
  avatarUrl,
  userName,
  email,
  formState,
  actions,
  meId,
}: Props) {
  const { editor } = useBlockEditor({
    setContent: actions.setContent,
    content: formState.content,
    editable: true,
    placeholder: "오늘 당신의 생각과 감정을 기록하세요.",
  });
  const { onSubmitPost, isPending, isSuccess } = usePostSubmit({
    meId,
    postId,
    formState,
  });

  const handleInputFocus = (editor: Editor | null) => {
    editor?.commands.focus("end");
  };

  const formattedDate = format(new Date(), "M월 d일 y년", { locale: ko });
  const formattedTime = format(new Date(), "HH:mm");

  return (
    <form
      onSubmit={onSubmitPost}
      className="h-fit w-full rounded-md bg-white p-4 shadow-sm dark:bg-var-darkgray"
    >
      <div className="flex flex-col gap-0">
        <div className="flex gap-4">
          <Avatar className="size-10 ring-2 ring-primary">
            <AvatarImage
              src={avatarUrl || undefined}
              alt={userName || "User"}
            />
            <AvatarFallback>{userName?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0 self-end">
            <div className="flex items-end gap-1">
              <h3 className="font-medium text-muted-foreground text-xs">
                {userName}
              </h3>
              <span className="text-caption text-muted-foreground text-sm">
                · @{email?.split("@")[0]}
              </span>
            </div>
            <p className="text-caption text-muted-foreground text-sm">
              {formattedDate} · {formattedTime}
            </p>
          </div>
          <div className="flex flex-1 justify-end">
            <EmotionGauge emotionLevel={formState.emotionLevel} />
          </div>
        </div>
        <Separator className="my-4" />
        <Input
          value={formState.title || ""}
          onChange={actions.onChangeTitle}
          disabled={meId === null}
          className="my-4 w-full overflow-x-auto border-none bg-transparent font-bold text-3xl shadow-none focus-visible:ring-0"
          placeholder="제목을 입력해 주세요."
        />
        <div className="flex max-h-full cursor-text flex-col gap-0">
          {editor && (
            <BubbleMenu editor={editor}>
              <BubbleMenuBar editor={editor} />
            </BubbleMenu>
          )}
          <EditorContent editor={editor} disabled={meId === null} />
          <div
            onClick={() => handleInputFocus(editor)}
            className="h-20 max-h-full w-full"
          />
        </div>
        <div className="flex flex-col">
          <TagsInput
            tags={formState.tags}
            setTags={actions.setTags}
            disabled={meId === null}
          />
          <div className="flex justify-between">
            <MobileOptionSection
              postType={formState.postType}
              accessType={formState.accessType}
              emotionLevel={formState.emotionLevel}
              onChangePostType={actions.onChangePostType}
              onChangeAccessType={actions.onChangeAccessType}
              onChangeEmotion={actions.onChangeEmotion}
            />

            <div className="flex flex-1 justify-end">
              <Button
                disabled={
                  editor?.storage.characterCount.characters() === 0 ||
                  formState.tags.length > 10 ||
                  isSuccess ||
                  isPending
                }
                type="submit"
                size="sm"
              >
                {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
                등록하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
