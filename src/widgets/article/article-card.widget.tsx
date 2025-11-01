import { ArticleCardContent } from "@/entities/article/ui/article-card-content";
import { ArticleCardHeader } from "@/entities/article/ui/article-card-header";

type ArticleCardProps = {
  userId: string;
  userName?: string;
  avatarUrl?: string | null;
  email?: string;
  emotionLevel: number;
  isMe: boolean;
  content: string;
  createdAt: Date;
  isPublic: boolean;
  onClick: () => void;
};

export const ArticleCard = ({
  userId,
  userName,
  avatarUrl,
  email,
  emotionLevel,
  isMe,
  content,
  isPublic,
  createdAt,
  onClick,
}: ArticleCardProps) => {
  return (
    <article className="flex flex-col gap-4">
      <ArticleCardHeader
        userId={userId}
        userName={userName}
        avatarUrl={avatarUrl}
        email={email}
        emotionLevel={emotionLevel}
        isMe={isMe}
        createdAt={createdAt}
      />
      <ArticleCardContent
        userId={userId}
        isMe={isMe}
        content={content}
        isPublic={isPublic}
        onClick={onClick}
      />
    </article>
  );
};
