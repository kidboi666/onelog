"use client";

import { EditorContent } from "@tiptap/react";
import type { IPost } from "@/entities/post/model/types";
import useBlockEditor from "@/hooks/useBlockEditor";
import { Badge } from "@/shared/components/ui/badge";

interface Props {
  post: IPost;
}

export function PostContent({ post }: Props) {
  const { editor } = useBlockEditor({ content: post.content });

  if (!editor) return null;

  return (
    <div className="my-8 flex flex-col gap-8">
      {post.title && <h1 className="my-4 font-bold text-3xl">{post.title}</h1>}
      <EditorContent editor={editor} />
      {post.tags && post.tags.length >= 1 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
