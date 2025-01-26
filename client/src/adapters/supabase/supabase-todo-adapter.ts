import { SupabaseTransformer } from '@/src/adapters/supabase/supabase-transformer'
import { PostgrestError, SupabaseClient } from '@supabase/supabase-js'
import {
  IGetTodoFromFolder,
  IGetTodoIndex,
  ITodo,
  ITodoBaseAdapter,
} from '@/src/types/todo'
import { APIError } from '@/src/utils/fetcher'

export class SupabaseTodoAdapter
  extends SupabaseTransformer
  implements ITodoBaseAdapter
{
  constructor(private readonly supabase: SupabaseClient) {
    super()
  }

  async getTodoFromFolder(params: IGetTodoFromFolder): Promise<ITodo[]> {
    const { data, error } = await this.supabase
      .from('todo')
      .select<string, ITodo>()
      .eq('user_id', params.meId)
    this.handleError(error)
    const filteredTodos = this.filterSelectedTodo(data, params.folderId)
    return this.transformResponse(filteredTodos)
  }

  async getTodoInCompleted(userId: string): Promise<ITodo[]> {
    const { data, error } = await this.supabase
      .from('todo')
      .select()
      .eq('user_id', userId)
      .is('is_complete', true)
    this.handleError(error)
    return this.transformResponse(data ?? [])
  }

  async getTodoInProgress(userId: string): Promise<ITodo[]> {
    const { data, error } = await this.supabase
      .from('todo')
      .select()
      .eq('user_id', userId)
      .is('is_complete', false)
    this.handleError(error)
    return this.transformResponse(data ?? [])
  }

  async getTodoIndex(params: IGetTodoIndex): Promise<ITodo[]> {
    const { data, error } = await this.supabase
      .from('todo')
      .select()
      .eq('user_id', params.meId)
    this.handleError(error)
    return this.transformResponse(data ?? [])
  }

  private handleError(error: PostgrestError | null) {
    if (error?.code && error?.message) {
      throw new APIError(error.code, error.message, error)
    }
  }

  private filterSelectedTodo(data: ITodo[] | null, folderId: number) {
    if (!data) return []
    return data.filter((todoFolder) => todoFolder.folderId === folderId)
  }
}
