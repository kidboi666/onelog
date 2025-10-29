"use client";

import { useRouter } from "next/navigation";
import type { IPost } from "@/entities/post/model/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { ROUTES } from "@/shared/routes/constants";
import type { ReactNode } from "react";

interface Props {
  post: IPost;
  children?: ReactNode;
}

export function PostAuthorCard({ post, children }: Props) {
  const router = useRouter();

  const pushNewPostPage = () => router.push(ROUTES.PROFILE.VIEW(post.userId));

  const { userInfo } = post;

  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-col gap-4 rounded-md bg-var-lightgray p-4 transition duration-300 hover:shadow-lg sm:flex-row dark:bg-var-dark">
        <div
          onClick={pushNewPostPage}
          className="flex flex-1 cursor-pointer gap-4"
        >
          <Avatar className="size-12">
            <AvatarImage
              src={userInfo.avatarUrl || undefined}
              alt={userInfo.userName || undefined}
            />
            <AvatarFallback>
              {userInfo.userName?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex w-full flex-col gap-1">
            <h3 className="font-semibold text-sm">{userInfo.userName}</h3>
            <p className="text-muted-foreground text-xs">{userInfo.email}</p>
            <p className="text-sm">{userInfo.aboutMe}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
