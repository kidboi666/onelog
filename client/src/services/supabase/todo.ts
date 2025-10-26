import { handleError, processQuery } from '@/src/services/supabase/helpers'
import { SupabaseClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@/src/lib/supabase/create-browser-client'
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

// 폴더 조회
export const getTodoFolder = async (
  userId: string,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<ITodoFolder[]> => {
  const query = supabase.from('todo_folder').select().eq('user_id', userId)
  return processQuery(query)
}

// 폴더별 투두 조회
export const getTodoFromFolder = async (
  params: IGetTodoFromFolder,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<ITodo[]> => {
  const query = supabase
    .from('todo')
    .select<string, ITodo>()
    .eq('user_id', params.meId)
  const data = await processQuery<ITodo[]>(query)
  return filterSelectedTodo(data, params.folderId)
}

// 완료된 투두 조회
export const getTodoInCompleted = async (
  userId: string,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<ITodo[]> => {
  const query = supabase
    .from('todo')
    .select()
    .eq('user_id', userId)
    .is('is_complete', true)
  return processQuery(query)
}

// 진행중인 투두 조회
export const getTodoInProgress = async (
  userId: string,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<ITodo[]> => {
  const query = supabase
    .from('todo')
    .select()
    .eq('user_id', userId)
    .is('is_complete', false)
  return processQuery(query)
}

export const getTodoIndex = async (
  params: IGetTodoIndex,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<ITodo[]> => {
  const query = supabase.from('todo').select().eq('user_id', params.meId)
  return processQuery(query)
}

export const createTodo = async (
  params: ICreateTodo,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<void> => {
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

export const createTodoFolder = async (
  params: ICreateTodoFolder,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<void> => {
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

export const deleteTodo = async (
  params: IDeleteTodo,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<void> => {
  const { error } = await supabase
    .from('todo')
    .delete()
    .eq('id', params.todoId)
  handleError(error)
}

export const deleteTodoFolder = async (
  folderId: number,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<void> => {
  const { error } = await supabase
    .from('todo_folder')
    .delete()
    .eq('id', folderId)
  handleError(error)
}

export const updateTodo = async (
  params: IUpdateTodo,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<void> => {
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

export const updateTodoFolder = async (
  params: IUpdateTodoFolder,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<void> => {
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
