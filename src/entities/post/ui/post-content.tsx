"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { EditorContent } from "@tiptap/react";
import { useMe } from "@/app/_store/use-me";
import { postQueries } from "@/entities/post/api/queries";
import useBlockEditor from "@/hooks/useBlockEditor";
import { Badge } from "@/shared/components/ui/badge";

interface Props {
  postId: number;
}

export function PostContent({ postId }: Props) {
  const { me } = useMe();
  const { data: post } = useSuspenseQuery(postQueries.getPost(postId, me?.id));
  const { editor } = useBlockEditor({ content: post?.content });

  if (!post || !editor) return null;

  return (
    <div className="my-8 flex flex-col gap-8">
      {post.title && <h1 className="my-4 font-bold text-3xl">{post.title}</h1>}
      <EditorContent editor={editor} />
      {post?.tags && post.tags.length >= 1 && (
        <div className="flex flex-wrap gap-2">
          {post?.tags?.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
