import { Separator } from "@/shared/components/ui/separator";
import type { Access, EmotionLevel, PostType } from "@/shared/types/enums";
import { EmotionSection } from "./emotion-section";
import { PostTypeSection } from "./post-type-section";
import { PublishSection } from "./publish-section";

interface Props {
  accessType: Access;
  emotionLevel: EmotionLevel | null;
  postType: PostType;
  onChangeEmotion: (emotionLevel: EmotionLevel | null) => void;
  onChangePostType: (postType: PostType) => void;
  onChangeAccessType: (accessType: Access) => void;
}

export function SideOptionsBar({
  accessType,
  emotionLevel,
  postType,
  onChangeEmotion,
  onChangePostType,
  onChangeAccessType,
}: Props) {
  return (
    <div className="sticky top-8 left-4 hidden h-fit animate-fade-in-reverse rounded-md bg-white p-2 shadow-md max-lg:fixed sm:flex dark:bg-var-darkgray">
      <nav className="flex flex-col items-center">
        <PublishSection
          accessType={accessType}
          onChangeAccessType={onChangeAccessType}
          isSide
        />
        <PostTypeSection
          postType={postType}
          onChangePostType={onChangePostType}
          isSide
        />
        {emotionLevel && (
          <>
            <Separator className="w-full" />
            <EmotionSection
              selectedEmotion={emotionLevel}
              onChangeEmotion={onChangeEmotion}
              isSide
            />
          </>
        )}
      </nav>
    </div>
  );
}
