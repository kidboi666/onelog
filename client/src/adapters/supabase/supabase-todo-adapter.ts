import { QueryHelpers } from '@/src/adapters/query-helpers'
import { SupabaseClient } from '@supabase/supabase-js'
import {
  ICreateTodo,
  ICreateTodoFolder,
  IDeleteTodo,
  IGetTodoFromFolder,
  IGetTodoIndex,
  ITodo,
  ITodoBaseAdapter,
  ITodoFolder,
  IUpdateTodo,
  IUpdateTodoFolder,
} from '@/src/types/todo'

export class SupabaseTodoAdapter
  extends QueryHelpers
  implements ITodoBaseAdapter
{
  constructor(private readonly supabase: SupabaseClient) {
    super()
  }

  async getTodoFolder(userId: string): Promise<ITodoFolder[]> {
    const { data, error } = await this.supabase
      .from('todo_folder')
      .select<string, ITodoFolder>()
      .eq('user_id', userId)
    this.handleError(error)
    return this.transformResponse(data ?? [])
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

  async createTodo(params: ICreateTodo): Promise<void> {
    const { error } = await this.supabase
      .from('todo')
      .insert({
        name: params.name,
        folder_id: params.folderId,
        user_id: params.userId || '',
        index: params.index,
      })
      .select()
    this.handleError(error)
  }

  async createTodoFolder(params: ICreateTodoFolder): Promise<void> {
    const { error } = await this.supabase
      .from('todo_folder')
      .insert({
        name: params.name,
        color: params.color,
        index: params.index,
        user_id: params.userId || '',
      })
      .select()
    this.handleError(error)
  }

  async deleteTodo(params: IDeleteTodo): Promise<void> {
    const { error } = await this.supabase
      .from('todo')
      .delete()
      .eq('id', params.todoId)
    this.handleError(error)
  }

  async deleteTodoFolder(folderId: number): Promise<void> {
    const { error } = await this.supabase
      .from('todo_folder')
      .delete()
      .eq('id', folderId)
    this.handleError(error)
  }

  async updateTodo(params: IUpdateTodo): Promise<void> {
    const { error } = await this.supabase
      .from('todo')
      .update({
        name: params.name,
        folder_id: params.folderId,
        user_id: params.userId,
        memo: params.memo,
        is_complete: params.isComplete,
        updated_at: params.updatedAt,
        index: params.index,
      })
      .eq('id', params.id)
      .select()
    this.handleError(error)
  }

  async updateTodoFolder(params: IUpdateTodoFolder): Promise<void> {
    const { error } = await this.supabase
      .from('todo_folder')
      .update({
        name: params.name,
        color: params.color,
        index: params.index,
      })
      .eq('id', params.id)
      .select()
    this.handleError(error)
  }

  private filterSelectedTodo(data: ITodo[] | null, folderId: number) {
    if (!data) return []
    return data.filter((todoFolder) => todoFolder.folderId === folderId)
  }
}
