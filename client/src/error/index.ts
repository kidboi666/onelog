import { AuthError } from '@supabase/auth-js'
import { StorageError } from '@supabase/storage-js'
import { PostgrestError } from '@supabase/supabase-js'
import { AxiosError } from 'axios'

export class APIError extends Error {
  constructor(
    public status: number | string,
    public message: string,
    public originalError:
      | AxiosError
      | AuthError
      | PostgrestError
      | StorageError,
  ) {
    super(message)
    this.name = 'APIError'
  }
}
