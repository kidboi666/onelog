import type { SupabaseClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@/shared/lib/supabase/create-browser-client";
import { handleError, processQuery } from "@/shared/lib/supabase/helpers";

export const createLike = async (
  postId: number,
  userId: string,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const query = supabase
    .from("like")
    .insert({
      post_id: Number(postId),
      user_id: userId,
    })
    .select();

  return processQuery(query);
};

export const deleteLike = async (
  postId: number,
  userId: string,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { error } = await supabase
    .from("like")
    .delete()
    .eq("user_id", userId)
    .eq("post_id", postId);

  handleError(error);
};
