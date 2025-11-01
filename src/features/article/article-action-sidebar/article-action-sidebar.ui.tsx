import { ArticleCardAccessTypeButton } from "@/entities/article/ui/article-card-access-type-button";
import { ArticleCardCommentButton } from "@/entities/article/ui/article-card-comment-button";
import { ArticleCardLikeButton } from "@/entities/article/ui/article-card-like-button";
import { ArticleOptionsDropdownMenu } from "@/entities/article/ui/article-card-option-dropdown-menu";
import { ArticleCardReportButton } from "@/entities/article/ui/article-card-report-button";
import { ArticleCardShareButton } from "@/entities/article/ui/article-card-share-button";
import { Separator } from "@/shared/components/ui/separator";
import { copyURL } from "@/shared/lib/utils";

type ArticleActionbarProps = {
  likeCount: number;
  isLike: boolean;
  commentCount: number;
  isPublic: boolean;
  onDelete: () => void;
  onModify: () => void;
  onReport: () => void;
  onLike: () => void;
};

export const ArticleActionbar = ({
  likeCount = 0,
  isLike = false,
  commentCount = 0,
  isPublic = true,
  onDelete,
  onLike,
  onModify,
  onReport,
}: ArticleActionbarProps) => {
  return (
    <aside className="sticky top-8 left-4 hidden h-fit rounded-md bg-card p-2 shadow-md max-lg:fixed sm:flex">
      <div className="flex flex-col items-center">
        <ArticleCardLikeButton
          likeCount={likeCount}
          isLike={isLike}
          onClick={onLike}
        />
        <ArticleCardCommentButton commentCount={commentCount} />
        <Separator />
        <ArticleCardAccessTypeButton isPublic={isPublic} />
        <ArticleCardShareButton onClick={copyURL} />
        <ArticleCardReportButton onClick={onReport} />
        <ArticleOptionsDropdownMenu onDelete={onDelete} onModify={onModify} />
      </div>
    </aside>
  );
};
