import { ChangeEvent, ComponentProps, useEffect, useRef } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import type {
  IUpdateProfileFormActions,
  IUpdateProfileFormStates,
} from "@/entities/auth/api/dtos";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";

const MAX_PROFILE_IMAGE_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface Props extends ComponentProps<"input"> {
  imagePreview: string | null;
  actions: IUpdateProfileFormActions;
  states: IUpdateProfileFormStates;
}

export function ProfileImageSection({
  imagePreview,
  actions,
  states,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return null;

    if (file.size > MAX_PROFILE_IMAGE_FILE_SIZE) {
      toast.error("파일 크기는 5MB 이하여야 합니다.");
      return null;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("이미지 파일만 업로드 가능합니다.");
      return null;
    }
    actions.onChangeImageFile(file);
    actions.onChangeAvatarPreview(URL.createObjectURL(file));
  };

  const handlePreviewClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    return () => {
      if (states.avatarPreview) {
        URL.revokeObjectURL(states.avatarPreview);
      }
    };
  }, [states.avatarPreview]);

  return (
    <div className="flex flex-col gap-4">
      <Label className="font-bold text-lg">프로필 사진</Label>
      <div className="flex items-end gap-4">
        <div className="relative">
          <Avatar className="size-32 ring-2 ring-border shadow-sm">
            <AvatarImage src={imagePreview || undefined} />
            <AvatarFallback className="text-4xl">U</AvatarFallback>
          </Avatar>
          <input
            ref={inputRef}
            type="file"
            onChange={handleChangeImage}
            accept="image/*"
            className="hidden"
          />
          <Button
            type="button"
            size="icon"
            onClick={handlePreviewClick}
            className="absolute bottom-0 right-0 rounded-full"
          >
            <Pencil className="size-4" />
          </Button>
        </div>
        <p className="text-muted-foreground text-xs">
          5MB 이하의 PNG, JPG, GIF 파일을 올려주세요.
        </p>
      </div>
    </div>
  );
}
