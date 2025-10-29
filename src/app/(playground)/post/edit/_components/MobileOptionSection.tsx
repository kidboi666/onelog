import type { EmotionLevel } from "@/shared/types/enums";
import { Access, PostType } from "@/shared/types/enums";
import EmotionSection from "./EmotionSection";
import PostTypeSection from "./PostTypeSection";
import PublishSection from "./PublishSection";

interface Props {
  accessType: Access;
  postType: PostType;
  emotionLevel: EmotionLevel | null;
  onChangeAccessType: (accessType: Access) => void;
  onChangePostType: (postType: PostType) => void;
  onChangeEmotion: (emotionLevel: EmotionLevel | null) => void;
}

export default function MobileOptionSection({
  accessType,
  postType,
  emotionLevel,
  onChangeAccessType,
  onChangePostType,
  onChangeEmotion,
}: Props) {
  return (
    <div className="flex items-center gap-4 sm:hidden">
      <PublishSection
        accessType={accessType}
        onChangeAccessType={onChangeAccessType}
      />
      <PostTypeSection
        postType={postType}
        onChangePostType={onChangePostType}
      />
      <EmotionSection
        selectedEmotion={emotionLevel}
        onChangeEmotion={onChangeEmotion}
      />
    </div>
  );
}
