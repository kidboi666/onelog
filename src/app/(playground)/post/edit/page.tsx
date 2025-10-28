"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useMe } from "@/app/_store/use-me";
import { postQueries } from "@/entities/post/api/queries";
import usePostForm from "./_hooks/usePostForm";

const PostForm = dynamic(() => import("./_components/PostForm"), {
  ssr: false,
});
const SideOptionsBar = dynamic(() => import("./_components/SideOptionsBar"), {
  ssr: false,
});

interface Props {
  searchParams: { post_id: string };
}

export default function Page({ searchParams: { post_id: postId } }: Props) {
  const { me } = useMe();
  const { data: post } = useSuspenseQuery(postQueries.getPost(Number(postId)));
  const { states, actions } = usePostForm(post ?? null);
  const { accessType, postType, emotionLevel } = states;
  const { onChangeAccessType, onChangePostType, onChangeEmotion } = actions;

  if (!me) {
    return null;
  }

  const { avatarUrl, userName, email } = me;

  return (
    <div className="flex flex-1 animate-fade-in gap-8">
      <PostForm
        postId={Number(postId)}
        meId={me.id}
        avatarUrl={avatarUrl}
        userName={userName}
        email={email}
        formState={states}
        actions={actions}
      />
      <SideOptionsBar
        accessType={accessType}
        emotionLevel={emotionLevel}
        postType={postType}
        onChangeEmotion={onChangeEmotion}
        onChangePostType={onChangePostType}
        onChangeAccessType={onChangeAccessType}
      />
    </div>
  );
}
