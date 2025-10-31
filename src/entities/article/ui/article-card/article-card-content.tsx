import { Card } from "@/shared/components/ui/card";

type ArticleCardContentProps = {
  userId: string;
  isMe: boolean;
  content: string;
  onClick?: () => void;
};

export const ArticleCardContent = ({
  userId,
  isMe,
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
          {/*<LikeButton*/}
          {/*  likeCount={likeCount}*/}
          {/*  isLike={isLike}*/}
          {/*  postId={postId}*/}
          {/*  onClick={() => null}*/}
          {/*/>*/}
          {/*<CommentButton commentCount={commentCount} disabled={disabled} />*/}
          {/*<AccessTypeButton accessType={accessType} />*/}
          {/*<ReportButton isSide={postId} onClick={() => null} />*/}
        </div>
      </div>
    </Card>
  );
};
