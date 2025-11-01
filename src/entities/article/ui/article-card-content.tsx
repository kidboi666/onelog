import { ArticleCardAccessTypeButton } from "@/entities/article/ui/article-card-access-type-button";
import { ArticleCardCommentButton } from "@/entities/article/ui/article-card-comment-button";
import { ArticleCardLikeButton } from "@/entities/article/ui/article-card-like-button";
import { ArticleCardReportButton } from "@/entities/article/ui/article-card-report-button";
import { Card } from "@/shared/components/ui/card";

type ArticleCardContentProps = {
  userId: string;
  isMe: boolean;
  content: string;
  isPublic: boolean;
  onClick: () => void;
};

export const ArticleCardContent = ({
  isPublic,
  content,
  onClick,
}: ArticleCardContentProps) => {
  return (
    <Card
      onClick={onClick}
      className="w-full cursor-pointer border-0 p-4 transition-shadow hover:shadow-lg"
    >
      <div className="flex flex-col gap-4">
        <div className="relative max-h-64 overflow-hidden">
          <p className="line-clamp-6">{content}</p>
        </div>

        <div className="flex items-center justify-between">
          <ArticleCardLikeButton
            likeCount={0}
            isLike={false}
            onClick={() => null}
          />
          <ArticleCardCommentButton commentCount={0} />
          <ArticleCardAccessTypeButton isPublic={isPublic} />
          <ArticleCardReportButton onClick={() => null} />
        </div>
      </div>
    </Card>
  );
};
