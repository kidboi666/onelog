import type { Editor } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import AccessTypeButtonWithDropDown from "./AccessTypeButtonWithDropDown";
import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";
import ReportButton from "./ReportButton";

type Access = "public" | "private" | "friends";

interface Props {
  tags?: string[];
  editor: Editor;
  postTitle?: string | null;
  onClick?: () => void;
  disabled?: boolean;
  likeCount: number;
  isLike: boolean;
  commentCount: number;
  accessType: Access;
  postId: number;
}

export function PostCardContent({
  tags,
  editor,
  postTitle,
  onClick,
  disabled = false,
  likeCount,
  isLike,
  commentCount,
  accessType,
  postId,
}: Props) {
  const [showGradient, setShowGradient] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const maxHeight = 256;
      setShowGradient(contentHeight > maxHeight);
    }
  }, []);

  return (
    <Card
      onClick={onClick}
      className="w-full cursor-pointer border-0 p-4 transition-shadow hover:shadow-lg"
    >
      <div className="flex flex-col gap-4">
        <div className="relative max-h-64 overflow-hidden">
          {postTitle && (
            <h3 className="mb-2 font-semibold text-lg">{postTitle}</h3>
          )}
          <EditorContent
            innerRef={contentRef}
            editor={editor}
            className="line-clamp-6"
          />
          {showGradient && (
            <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-gradient-to-t from-background" />
          )}
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <nav className="flex items-center justify-between">
          <LikeButton
            likeCount={likeCount}
            isLike={isLike}
            postId={postId}
            viewToolTip
          />
          <CommentButton
            commentCount={commentCount}
            disabled={disabled}
            viewToolTip
          />
          <AccessTypeButtonWithDropDown accessType={accessType} viewToolTip />
          <ReportButton postId={postId} viewToolTip />
        </nav>
      </div>
    </Card>
  );
}
