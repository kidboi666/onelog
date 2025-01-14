import { Tables } from '@/src/types/supabase';


export interface IComment extends Tables<'comment'> {
  user_info: Pick<Tables<'user_info'>, 'user_name' | 'email' | 'avatar_url' | 'about_me'>
}
