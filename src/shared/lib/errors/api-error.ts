import type { AuthError } from "@supabase/auth-js";
import type { StorageError } from "@supabase/storage-js";
import type { PostgrestError } from "@supabase/supabase-js";

export class APIError extends Error {
  constructor(
    public status: number | string,
    public message: string,
    public originalError: AuthError | PostgrestError | StorageError,
  ) {
    super(message);
    this.name = "APIError";
  }
}
