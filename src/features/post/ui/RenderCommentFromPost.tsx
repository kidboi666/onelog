import { CommentList } from "@/features/comment";

interface Props {
  postId: number;
}

export function RenderCommentFromPost({ postId }: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-md bg-white p-4 shadow-sm dark:bg-var-darkgray">
      <CommentList postId={postId} />
    </div>
    /**
     * TODO #1 무한 대댓글이 가능함 @kidboi666
     */
  );
}
