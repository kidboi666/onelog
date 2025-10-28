import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { ROUTES } from "@/app/routes";
import type { IPost } from "@/entities/post/model/types";
import useBlockEditor from "@/hooks/useBlockEditor";
import PostCardContent from "./PostCardContent";
import PostHeader from "./PostHeader";

interface Props {
  post: IPost;
  createdAtLiked?: string;
  disabled?: boolean;
}

export function PostCard({ post, createdAtLiked, disabled }: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const postId = Number(post?.id);
  const content = post?.content;
  const tags = post?.tags || [];

  const pushPostDetail = () => {
    startTransition(() => {
      router.push(ROUTES.POST.VIEW(postId));
    });
  };

  const { editor } = useBlockEditor({
    content,
  });

  if (!editor) return null;

  const {
    accessType,
    title,
    likeCount,
    isLiked,
    commentCount,
    userId,
    postType,
    emotionLevel,
    createdAt,
  } = post;

  return (
    <div className="flex flex-col gap-4">
      {post && (
        <PostHeader
          userId={userId}
          createdAtLiked={createdAtLiked}
          postType={postType}
          email={post.userInfo.email}
          avatarUrl={post.userInfo.avatarUrl}
          userName={post.userInfo.userName}
          emotionLevel={emotionLevel}
          createdAt={createdAt}
        />
      )}
      <PostCardContent
        tags={tags}
        editor={editor}
        postTitle={title}
        accessType={accessType}
        likeCount={likeCount?.[0].count}
        isLike={isLiked?.length > 0}
        commentCount={commentCount?.[0].count}
        postId={postId}
        onClick={pushPostDetail}
        disabled={disabled}
      />
    </div>
  );
}
