"use client";

import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { useDeletePost } from "@/entities/post/api/mutates";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

interface DeletePostDialogProps {
  postId: number;
  children: ReactNode;
  onSuccess?: () => void;
}

export function DeletePostDialog({
  postId,
  children,
  onSuccess,
}: DeletePostDialogProps) {
  const { mutate: deletePost, isPending } = useDeletePost();

  const handlePostDelete = () => {
    deletePost(postId, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 삭제</DialogTitle>
          <DialogDescription>
            정말 게시물을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row gap-2">
          <Button
            variant="secondary"
            disabled={isPending}
            className="flex-1"
          >
            취소하기
          </Button>
          <Button
            onClick={handlePostDelete}
            disabled={isPending}
            className="flex-1"
          >
            {isPending ? <Loader2 className="size-4 animate-spin" /> : "삭제하기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
