import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { ROUTES } from "@/shared/routes/constants";
import type { IUpdatePostFormStates } from "@/entities/post";
import { useCreatePost } from "@/features/post/api/use-create-post";
import { useUpdatePost } from "@/features/post/api/use-update-post";

export default function usePostSubmit({
  meId,
  postId,
  formState,
}: {
  meId: string;
  postId: number;
  formState: IUpdatePostFormStates;
}) {
  const router = useRouter();
  const { mutate: addPost, isPending, isSuccess } = useCreatePost();
  const { mutate: updatePost } = useUpdatePost();

  const handleSubmitPost = (e: FormEvent) => {
    e.preventDefault();
    if (!meId) return;

    const postData = { ...formState, meId };

    if (postId) {
      updatePost(
        { ...postData, id: postId },
        { onSuccess: () => router.replace(ROUTES.HOME) },
      );
    } else {
      addPost(postData, {
        onSuccess: () => router.replace(ROUTES.HOME),
      });
    }
  };

  return { onSubmitPost: handleSubmitPost, isPending, isSuccess };
}
