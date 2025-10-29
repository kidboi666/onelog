"use client";

import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import { useState } from "react";
import { useCommentReplies } from "@/app/(playground)/(home)/_hooks/useCommentReplies";
import type { IComment } from "@/entities/comment/model/types";
import type { IUserInfo } from "@/entities/user/model/types";
import { ROUTES } from "@/shared/routes/constants";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { CommentButton } from "./comment-button";
import { CommentInput } from "./comment-input";
import { CommentInputButton } from "./comment-input-button";
import { CommentModifyInput } from "./comment-modify-input";
import { PostOptionsMenu, ReportButton } from "@/features/post";

interface Props {
  comment: IComment;
  postId: number;
  me: IUserInfo | null;
}

export function CommentItem({ comment, postId, me }: Props) {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const commentToComments = useCommentReplies(comment.id, postId);

  const toggleShowCommentInput = () => setShowCommentInput(!showCommentInput);
  const toggleModify = () => setIsModify(!isModify);

  const displayName =
    comment.userInfo.userName ||
    comment.userInfo.email?.split("@")[0] ||
    "익명";
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <div className="flex w-full gap-3">
      <Link href={ROUTES.PROFILE.VIEW(comment.userId)}>
        <Avatar className="size-10 flex-shrink-0 cursor-pointer">
          <AvatarImage src={comment.userInfo.avatarUrl || undefined} />
          <AvatarFallback>{displayName[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-end gap-1">
            <Link
              href={ROUTES.PROFILE.VIEW(comment.userId)}
              className="font-medium text-sm hover:underline"
            >
              {displayName}
            </Link>
            <span className="text-muted-foreground text-xs">
              @{comment.userInfo.email?.split("@")[0]}
            </span>
          </div>
          <span className="text-muted-foreground text-xs">{timeAgo}</span>

          {isModify ? (
            <CommentModifyInput comment={comment} onModify={toggleModify} />
          ) : (
            <div className="w-fit rounded-md bg-muted p-2">
              <p className="text-sm">{comment.content}</p>
            </div>
          )}

          <div className="flex gap-0">
            {comment.commentId && (
              <CommentButton commentCount={comment.comment ?? 0} />
            )}
            <CommentInputButton onShowCommentInput={toggleShowCommentInput} />
            <ReportButton commentId={comment.id} />
            <PostOptionsMenu
              type="comment"
              onModify={toggleModify}
              commentAuthorId={comment.userId}
              commentId={comment.id}
              postId={postId}
            />
          </div>
        </div>
        {showCommentInput && (
          <CommentInput postId={postId} commentId={comment.id} me={me} />
        )}
        {commentToComments.length > 0 &&
          commentToComments.map((reply) => (
            <CommentItem
              key={reply.id}
              postId={postId}
              comment={reply}
              me={me}
            />
          ))}
      </div>
    </div>
  );
}
