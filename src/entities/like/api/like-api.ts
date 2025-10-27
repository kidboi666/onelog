import type { SupabaseClient } from "@supabase/supabase-js";
import type { ILike } from "@/entities/like/model/types";
import { createBrowserClient } from "@/shared/lib/supabase/create-browser-client";
import { processQuery } from "@/shared/lib/supabase/helpers";

export const handleLike = async (
  params: ILike,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  let query: any = supabase.from("like");

  if (params.isLike) {
    query = query
      .delete()
      .eq("user_id", params.meId)
      .eq("post_id", params.postId);
  } else {
    query = query
      .insert({
        post_id: Number(params.postId),
        user_id: params.meId,
      })
      .select();
  }

  await processQuery(query);
};
