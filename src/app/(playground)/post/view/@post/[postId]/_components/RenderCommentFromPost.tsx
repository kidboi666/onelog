import Comments from "@/app/(playground)/(home)/_components/Comments";

interface Props {
  postId: number;
}

export default function RenderCommentFromPost({ postId }: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-md bg-white p-4 shadow-sm dark:bg-var-darkgray">
      <Comments postId={postId} />
    </div>
    /**
     * TODO #1 무한 대댓글이 가능함 @kidboi666
     */
  );
}
