"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMe } from "@/app/store/use-me";
import { postQueries } from "@/entities/post/api/queries";
import { ROUTES } from "@/shared/config/routes";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/components/ui/avatar";
import RenderActionButtonFromAuthorInfo from "./RenderActionButtonFromAuthorInfo";

interface Props {
  postId: number;
}

export default function PostAuthorInfo({ postId }: Props) {
  const router = useRouter();
  const { me } = useMe();
  const { data: post } = useSuspenseQuery(postQueries.getPost(postId, me?.id));

  if (!post) {
    return null;
  }

  const pushNewPostPage = () => router.push(ROUTES.PROFILE.VIEW(post.userId));

  const { userInfo, userId } = post;

  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-col gap-4 rounded-md bg-var-lightgray p-4 transition duration-300 hover:shadow-lg sm:flex-row dark:bg-var-dark">
        <div onClick={pushNewPostPage} className="flex flex-1 cursor-pointer gap-4">
          <Avatar className="size-12">
            <AvatarImage src={userInfo.avatarUrl || undefined} alt={userInfo.userName} />
            <AvatarFallback>{userInfo.userName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex w-full flex-col gap-1">
            <h3 className="font-semibold text-sm">{userInfo.userName}</h3>
            <p className="text-muted-foreground text-xs">{userInfo.email}</p>
            <p className="text-sm">{userInfo.aboutMe}</p>
          </div>
          <RenderActionButtonFromAuthorInfo meId={me?.id} userId={userId} />
        </div>
      </div>
    </div>
  );
}
