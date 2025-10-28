"use client";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useDeletePost } from "@/entities/post/api/mutates";
import { ROUTES } from "@/core/routes";
import { Button } from "@/shared/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import Modal from "@/shared/components/Modal";

interface Props {
  params: { postId: string };
}

export default function DeletePostModal({ params }: Props) {
  const router = useRouter();
  const { mutate: deletePost, isPending } = useDeletePost();

  const handlePostDelete = () => {
    deletePost(Number(params.postId), {
      onSuccess: () => {
        router.push(ROUTES.HOME);
      },
    });
  };

  return (
    <Modal>
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
          onClick={() => router.back()}
          className="flex-1"
        >
          취소하기
        </Button>
        <Button
          onClick={handlePostDelete}
          disabled={isPending}
          className="flex-1"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "삭제하기"
          )}
        </Button>
      </DialogFooter>
    </Modal>
  );
}
