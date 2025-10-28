"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { ROUTES } from "@/app/_routes/constants";
import { useMe } from "@/app/_store/use-me";
import { useHandleLikePost } from "@/entities/like";

interface Props {
  postId: number;
  isLike: boolean;
}

export function useLikeMutates({ postId, isLike }: Props): {
  onLikePost: (e: MouseEvent) => void;
} {
  const router = useRouter();
  const { me } = useMe();
  const { mutate: likeOrUnlike } = useHandleLikePost();

  const handleLikePost = (e: MouseEvent) => {
    e.stopPropagation();
    me
      ? likeOrUnlike({
          meId: me?.id,
          postId,
          isLike,
        })
      : router.push(ROUTES.MODAL.AUTH.GUARD, { scroll: false });
  };

  return { onLikePost: handleLikePost };
}
