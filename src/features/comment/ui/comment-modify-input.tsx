import { useEffect, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import type { IComment } from "@/entities/comment/model/types";
import { useUpdateComment } from "@/entities/comment/api/mutates";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

interface Props {
  comment: IComment;
  onModify: () => void;
}

export function CommentModifyInput({ comment, onModify }: Props) {
  const [content, setContent] = useState("");
  const { mutate: updateComment, isPending } = useUpdateComment();

  const handlePostComment = (e: FormEvent) => {
    e.preventDefault();
    updateComment(
      {
        id: comment.id,
        postId: comment.postId,
        content,
      },
      {
        onSuccess: () => {
          onModify();
        },
      }
    );
  };

  useEffect(() => {
    setContent(comment.content);
  }, [comment.content]);

  return (
    <form onSubmit={handlePostComment}>
      <div className="flex flex-col gap-2">
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full"
        />
        <div className="flex gap-2">
          <Button
            size="sm"
            type="submit"
            disabled={comment.content === content || isPending}
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "수정하기"
            )}
          </Button>
          <Button variant="secondary" size="sm" type="button" onClick={onModify}>
            돌아가기
          </Button>
        </div>
      </div>
    </form>
  );
}
