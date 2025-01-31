import { handleError, processQuery } from '@/src/adapters/query-helpers'
import { SupabaseClient } from '@supabase/supabase-js'
import {
  ICreateTodo,
  ICreateTodoFolder,
  IDeleteTodo,
  IGetTodoFromFolder,
  IGetTodoIndex,
  ITodoFolder,
  IUpdateTodo,
  IUpdateTodoFolder,
} from '@/src/types/dtos/todo'
import { ITodo } from '@/src/types/entities/todo'
import { ITodoBaseAdapter } from '@/src/types/services/index'

export const createSupabaseTodoAdapter = (
  supabase: SupabaseClient,
): ITodoBaseAdapter => {
  // 폴더 조회
  const getTodoFolder = async (userId: string): Promise<ITodoFolder[]> => {
    const query = supabase.from('todo_folder').select().eq('user_id', userId)
    return processQuery(query)
  }

  // 폴더별 투두 조회
  const getTodoFromFolder = async (
    params: IGetTodoFromFolder,
  ): Promise<ITodo[]> => {
    const query = supabase
      .from('todo')
      .select<string, ITodo>()
      .eq('user_id', params.meId)
    const data = await processQuery<ITodo[]>(query)
    return filterSelectedTodo(data, params.folderId)
  }

  // 완료된 투두 조회
  const getTodoInCompleted = async (userId: string): Promise<ITodo[]> => {
    const query = supabase
      .from('todo')
      .select()
      .eq('user_id', userId)
      .is('is_complete', true)
    return processQuery(query)
  }

  // 진행중인 투두 조회
  const getTodoInProgress = async (userId: string): Promise<ITodo[]> => {
    const query = supabase
      .from('todo')
      .select()
      .eq('user_id', userId)
      .is('is_complete', false)
    return processQuery(query)
  }

  const getTodoIndex = async (params: IGetTodoIndex): Promise<ITodo[]> => {
    const query = supabase.from('todo').select().eq('user_id', params.meId)
    return processQuery(query)
  }

  const createTodo = async (params: ICreateTodo): Promise<void> => {
    const { error } = await supabase
      .from('todo')
      .insert({
        name: params.name,
        folder_id: params.folderId,
        user_id: params.userId || '',
        index: params.index,
      })
      .select()
    handleError(error)
  }

  const createTodoFolder = async (params: ICreateTodoFolder): Promise<void> => {
    const { error } = await supabase
      .from('todo_folder')
      .insert({
        name: params.name,
        color: params.color,
        index: params.index,
        user_id: params.userId || '',
      })
      .select()
    handleError(error)
  }

  const deleteTodo = async (params: IDeleteTodo): Promise<void> => {
    const { error } = await supabase
      .from('todo')
      .delete()
      .eq('id', params.todoId)
    handleError(error)
  }

  const deleteTodoFolder = async (folderId: number): Promise<void> => {
    const { error } = await supabase
      .from('todo_folder')
      .delete()
      .eq('id', folderId)
    handleError(error)
  }

  const updateTodo = async (params: IUpdateTodo): Promise<void> => {
    const { error } = await supabase
      .from('todo')
      .update({
        name: params.name,
        folder_id: params.folderId,
        user_id: params.userId,
        memo: params.memo,
        is_complete: params.isComplete,
        updated_at: 'now()',
        index: params.index,
      })
      .eq('id', params.id)
      .select()
    handleError(error)
  }

  const updateTodoFolder = async (params: IUpdateTodoFolder): Promise<void> => {
    const { error } = await supabase
      .from('todo_folder')
      .update({
        name: params.name,
        color: params.color,
        index: params.index,
      })
      .eq('id', params.id)
      .select()
    handleError(error)
  }

  // 프라이빗 헬퍼 함수
  const filterSelectedTodo = (data: ITodo[] | null, folderId: number) => {
    if (!data) return []
    return data.filter((todoFolder) => todoFolder.folderId === folderId)
  }

  return {
    getTodoFolder,
    getTodoFromFolder,
    getTodoInCompleted,
    getTodoInProgress,
    getTodoIndex,
    createTodo,
    createTodoFolder,
    deleteTodo,
    deleteTodoFolder,
    updateTodo,
    updateTodoFolder,
  }
}
