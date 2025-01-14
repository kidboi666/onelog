import { Tables } from './supabase'

export interface TFollower extends Tables<'follow'> {
  user_info: Tables<'user_info'>
}
