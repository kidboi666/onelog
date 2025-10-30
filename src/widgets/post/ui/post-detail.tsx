import { PostAuthorCard, PostContent, PostHeaderInfo } from "@/entities/post";
import {
  PostActionBar,
  PostCountInfo,
  RenderCommentFromPost,
  SideActionBar,
} from "@/features/post";
import { Separator } from "@/shared/components/ui/separator";

export function PostDetail() {
  return (
    <div className="flex gap-4">
      <div className="flex flex-1 animate-fade-in flex-col gap-8">
        <div className="flex flex-col gap-0 rounded-md bg-card p-2 shadow-sm sm:gap-4 sm:p-4">
          <PostHeaderInfo postId={postIdNum} />
          <Separator />
          <PostContent postId={postIdNum} />
          <PostAuthorCard postId={postIdNum} />
          <PostActionBar postId={postIdNum} />
        </div>
        <RenderCommentFromPost postId={postIdNum} />
      </div>

      <div className="sticky top-8 left-4 hidden h-fit animate-fade-in-reverse rounded-md bg-card p-2 shadow-md max-lg:fixed sm:flex">
        <nav className="flex flex-col items-center">
          <PostCountInfo postId={postIdNum} />
          <Separator className="w-full" />
          <SideActionBar postId={postIdNum} />
        </nav>
      </div>
    </div>
  );
}
