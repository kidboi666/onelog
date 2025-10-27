import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  ICreateComment,
  IUpdateComment,
} from "@/entities/comment/api/dtos";
import { createBrowserClient } from "@/shared/lib/supabase/create-browser-client";
import { handleError } from "@/shared/lib/supabase/helpers";

export const createComment = async (
  params: ICreateComment,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { error } = await supabase.from("comment").insert({
    user_id: params.userId,
    content: params.content,
    post_id: params.postId,
    comment_id: params.commentId || null,
  });

  handleError(error);
};

export const deleteComment = async (
  commentId: number,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { error } = await supabase.from("comment").delete().eq("id", commentId);

  handleError(error);
};

export const updateComment = async (
  params: IUpdateComment,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { error } = await supabase
    .from("comment")
    .update({ content: params.content })
    .eq("id", params.id);

  handleError(error);
};
