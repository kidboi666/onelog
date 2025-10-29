"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Edit2, MoreVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMe } from "@/app/_store/use-me";
import { postQueries } from "@/entities/post/api/queries";
import { DeleteCommentDialog } from "@/features/comment/ui";
import { DeletePostDialog } from "@/features/post";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { ROUTES } from "@/shared/routes/constants";

interface BaseProps {
  isSide?: boolean;
  postId: number;
}

interface PostProps extends BaseProps {
  type: "post";
}

interface CommentProps extends BaseProps {
  type: "comment";
  commentId: number;
  commentAuthorId: string;
  onModify: () => void;
}

type Props = PostProps | CommentProps;

const checkIsOwner = (myId?: string | null, ownerId?: string) => {
  return myId === ownerId;
};

export function PostOptionsMenu(props: Props) {
  const router = useRouter();
  const { me } = useMe();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { data: post } = useSuspenseQuery(
    postQueries.getPost(props.postId, me?.id),
  );

  const isOwner =
    props.type === "comment"
      ? checkIsOwner(me?.id, props.commentAuthorId)
      : checkIsOwner(me?.id, post?.userId);

  if (!isOwner) {
    return null;
  }

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteSuccess = () => {
    if (props.type === "post") {
      router.push(ROUTES.HOME);
    }
    // For comment deletion, just close the dialog and the list will refresh
  };

  const pushEditPage = () => {
    if (props.type === "comment") {
      props.onModify();
    } else {
      router.push(ROUTES.POST.EDIT(props.postId));
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size={props.isSide ? "default" : "icon"}
            className="h-auto p-2"
          >
            <MoreVertical className={props.isSide ? "h-6 w-6" : "h-4 w-4"} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={props.isSide ? "start" : "end"}>
          <DropdownMenuItem
            onClick={pushEditPage}
            className="cursor-pointer gap-2"
          >
            <Edit2 className="h-4 w-4" />
            수정하기
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDeleteClick}
            className="cursor-pointer gap-2"
          >
            <Trash2 className="h-4 w-4" />
            삭제하기
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Dialogs */}
      {props.type === "post" ? (
        <DeletePostDialog
          postId={props.postId}
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onSuccess={handleDeleteSuccess}
        />
      ) : (
        <DeleteCommentDialog
          commentId={props.commentId}
          postId={props.postId}
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </>
  );
}
